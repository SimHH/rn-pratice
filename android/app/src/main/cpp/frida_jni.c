#include <jni.h>
#include <frida-core.h>
#include <string.h>

static FridaDevice *g_device = NULL;
static FridaDeviceManager *g_manager = NULL;

JNIEXPORT jobject JNICALL
Java_com_myapp_LoadFrida_listApps(JNIEnv *env, jobject thiz) {
    frida_init();
    GError *error = NULL;

    FridaDeviceManager *manager = frida_device_manager_new();
    FridaDevice *device = frida_device_manager_find_device_by_type_sync(
        manager, FRIDA_DEVICE_TYPE_REMOTE, 0, NULL, &error
    );


    if (error != NULL || device == NULL) {
        return NULL;
    }

    FridaApplicationList *apps =
        frida_device_enumerate_applications_sync(device, NULL, NULL, &error);

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
        snprintf(buffer, sizeof(buffer), "%s",
                 frida_application_get_identifier(app));

        jstring jstr = (*env)->NewStringUTF(env, buffer);
        (*env)->CallBooleanMethod(env, list, add, jstr);
    }

    g_object_unref(apps);
    g_object_unref(device);
    g_object_unref(manager);

    return list;
}

JNIEXPORT jstring JNICALL
Java_com_myapp_LoadFrida_spawnApp(JNIEnv *env, jobject thiz, jstring jpkg) {
    frida_init();
    GError *error = NULL;

    const char *pkg = (*env)->GetStringUTFChars(env, jpkg, 0);

    FridaDeviceManager *manager = frida_device_manager_new();
    FridaDevice *device = frida_device_manager_find_device_by_type_sync(
        manager, FRIDA_DEVICE_TYPE_REMOTE, 0, NULL, &error
    );

    if(error != NULL || device == NULL) {
        return (*env)->NewStringUTF(env, "error at init");
    }

    // spawn
    gint pid = frida_device_spawn_sync(device, pkg, NULL, NULL, &error);
    if(error != NULL) return (*env)->NewStringUTF(env, error->message);

    // attach
    FridaSession *session = frida_device_attach_sync(device, pid, NULL, NULL, &error);
    if(error != NULL) return (*env)->NewStringUTF(env, error->message);

    // resume
    frida_device_resume_sync(device, pid, NULL, &error);
    if (error != NULL) return (*env)->NewStringUTF(env, error->message);

    (*env)->ReleaseStringUTFChars(env, jpkg, pkg);

    char buffer[128];
    snprintf(buffer, sizeof(buffer), "Target Process init at %d", pid);

    return (*env)->NewStringUTF(env, buffer);
    
}


JNIEXPORT jstring JNICALL
Java_com_myapp_LoadFrida_getMessage(JNIEnv *env, jobject thiz) {
    return (*env)->NewStringUTF(env, "Hello from C Library!");
}
