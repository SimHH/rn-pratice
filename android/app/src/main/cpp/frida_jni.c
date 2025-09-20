#include <jni.h>
#include <frida-core.h>
#include <string.h>

static FridaDevice *g_device = NULL;
static FridaDeviceManager *g_manager = NULL;

JNIEXPORT jobject JNICALL
Java_com_myapp_LoadFrida_listApps(JNIEnv *env, jobject thiz) {
    frida_init();
    GError *error = NULL;

    if (g_manager == NULL) {
        g_manager = frida_device_manager_new();
    }

    if (g_device == NULL) {
        g_device = frida_device_manager_find_device_by_type_sync(
            g_manager, FRIDA_DEVICE_TYPE_REMOTE, 0, NULL, &error);
    }

    if (error != NULL || g_device == NULL) {
        return NULL;
    }

    FridaApplicationList *apps =
        frida_device_enumerate_applications_sync(g_device, NULL, NULL, &error);

    if (error != NULL || apps == NULL) {
        return NULL;
    }

    jclass arrayListClass = (*env)->FindClass(env, "java/util/ArrayList");
    jmethodID init = (*env)->GetMethodID(env, arrayListClass, "<init>", "()V");
    jmethodID add = (*env)->GetMethodID(env, arrayListClass, "add", "(Ljava/lang/Object;)Z");
    jobject list = (*env)->NewObject(env, arrayListClass, init);

    for (int i = 0; i < frida_application_list_size(apps); i++) {
        FridaApplication *app = frida_application_list_get(apps, i);

        char buffer[512];
        snprintf(buffer, sizeof(buffer), "%s (%s)",
                 frida_application_get_identifier(app),
                 frida_application_get_name(app));

        jstring jstr = (*env)->NewStringUTF(env, buffer);
        (*env)->CallBooleanMethod(env, list, add, jstr);
    }

    g_object_unref(apps);
    g_object_unref(g_device);
    g_object_unref(g_manager);

    return list;
}

JNIEXPORT jint JNICALL
Java_com_myapp_LoadFrida_spawnApp(JNIEnv *env, jobject thiz, jstring jpkg) {
    frida_init();
    GError *error = NULL;

    const char *pkg = (*env)->GetStringUTFChars(env, jpkg, 0);

    FridaDevice *device = frida_device_manager_find_device_by_type_sync(
        g_manager, FRIDA_DEVICE_TYPE_REMOTE, 0, NULL, &error);

        if(error != NULL || g_device == NULL) {
            return -1;
        }

        // spawn
        gint pid = frida_device_spawn_sync(g_device, pkg, NULL, NULL, &error);
        if(error != NULL) return -2;


        // attach
        FridaSession *session = frida_device_attach_sync(g_device, pid, NULL, NULL, &error);
        if(error != NULL) return -3;

        // resume
        frida_device_resume_sync(g_device, pid, NULL, &error);
        if (error != NULL) return -4;

        (*env)->ReleaseStringUTFChars(env, jpkg, pkg);
        return pid;
    
}


JNIEXPORT jstring JNICALL
Java_com_myapp_LoadFrida_getMessage(JNIEnv *env, jobject thiz) {
    return (*env)->NewStringUTF(env, "Hello from C Library!");
}
