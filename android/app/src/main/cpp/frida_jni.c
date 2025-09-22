#include <jni.h>
#include <frida-core.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

static FridaDevice *g_device = NULL;
static FridaDeviceManager *g_manager = NULL;

JNIEXPORT jobject JNICALL
Java_com_myapp_LoadFrida_listAppsC(JNIEnv *env, jobject thiz) {
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
Java_com_myapp_LoadFrida_spawnAppC(JNIEnv *env, jobject thiz, jstring jpkg) {
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
    snprintf(buffer, sizeof(buffer), "Target Process init %d", pid);

    return (*env)->NewStringUTF(env, buffer);
    
}

JNIEXPORT jstring JNICALL
Java_com_myapp_LoadFrida_loadScriptC(JNIEnv *env, jobject thiz,
                                     jstring jPackageName, jstring jScriptName) {
    const char *packageName = (*env)->GetStringUTFChars(env, jPackageName, 0);
    const char *scriptName  = (*env)->GetStringUTFChars(env, jScriptName, 0);

    // script path
    char path[512];
    snprintf(path, sizeof(path), "/data/data/com.myapp/files/scripts/%s", scriptName);

    FILE *fp = fopen(path, "r");
    if (!fp) {
        (*env)->ReleaseStringUTFChars(env, jPackageName, packageName);
        (*env)->ReleaseStringUTFChars(env, jScriptName, scriptName);
        return (*env)->NewStringUTF(env, "cannot open script file");
    }

    fseek(fp, 0, SEEK_END);
    long fsize = ftell(fp);
    fseek(fp, 0, SEEK_SET);

    char *scriptSource = (char *)malloc(fsize + 1);
    if (!scriptSource) {
        fclose(fp);
        (*env)->ReleaseStringUTFChars(env, jPackageName, packageName);
        (*env)->ReleaseStringUTFChars(env, jScriptName, scriptName);
        return (*env)->NewStringUTF(env, "malloc failed");
    }

    size_t readBytes = fread(scriptSource, 1, fsize, fp);
    fclose(fp);
    scriptSource[readBytes] = '\0';

    // init frida
    frida_init();
    GError *error = NULL;

    // device
    FridaDeviceManager *manager = frida_device_manager_new();
    FridaDevice *device = frida_device_manager_get_device_by_type_sync(
        manager, FRIDA_DEVICE_TYPE_REMOTE, 0, NULL, &error);

    if (error != NULL) {
        const char *msg = error->message;
        g_error_free(error);
        free(scriptSource);
        (*env)->ReleaseStringUTFChars(env, jPackageName, packageName);
        (*env)->ReleaseStringUTFChars(env, jScriptName, scriptName);
        return (*env)->NewStringUTF(env, msg);
    }

    // spawn
    guint pid = frida_device_spawn_sync(device, packageName, NULL, NULL, &error);

    if (error != NULL) {
        const char *msg = error->message;
        g_error_free(error);
        free(scriptSource);
        (*env)->ReleaseStringUTFChars(env, jPackageName, packageName);
        (*env)->ReleaseStringUTFChars(env, jScriptName, scriptName);
        return (*env)->NewStringUTF(env, "spawn success");
    }

    // attach
    FridaSession *session = frida_device_attach_sync(device, pid, NULL, NULL, &error);
    if (error != NULL) {
        const char *msg = error->message;
        g_error_free(error);
        free(scriptSource);
        (*env)->ReleaseStringUTFChars(env, jPackageName, packageName);
        (*env)->ReleaseStringUTFChars(env, jScriptName, scriptName);
        return (*env)->NewStringUTF(env, msg);
    }

    

    // create script
    FridaScript *script = frida_session_create_script_sync(session, scriptSource, NULL, NULL, &error);

    if (error != NULL) {
        const char *msg = error->message;
        g_error_free(error);
        (*env)->ReleaseStringUTFChars(env, jPackageName, packageName);
        (*env)->ReleaseStringUTFChars(env, jScriptName, scriptName);
        return (*env)->NewStringUTF(env, scriptSource);
    }

    

    // init script
    frida_script_load_sync(script, NULL, &error);
    if (error != NULL) {
        const char *msg = error->message;
        g_error_free(error);
        (*env)->ReleaseStringUTFChars(env, jPackageName, packageName);
        (*env)->ReleaseStringUTFChars(env, jScriptName, scriptName);
        return (*env)->NewStringUTF(env, "inject success");
    }

    // resume
    frida_device_resume_sync(device, pid, NULL, &error);

    (*env)->ReleaseStringUTFChars(env, jPackageName, packageName);
    (*env)->ReleaseStringUTFChars(env, jScriptName, scriptName);

    return (*env)->NewStringUTF(env, "SUCCESS");
}

JNIEXPORT jstring JNICALL
Java_com_myapp_LoadFrida_getMessageC(JNIEnv *env, jobject thiz) {
    return (*env)->NewStringUTF(env, "Hello from C Library!");
}
