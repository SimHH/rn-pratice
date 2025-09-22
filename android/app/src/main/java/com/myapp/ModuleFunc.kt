package com.myapp

import com.facebook.react.bridge.*

class ModuleFunc(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "FridaFunc"

    @ReactMethod
    fun getMessageFromC(promise: Promise) {
        try {
            val msg = LoadFrida.getMessageC()
            promise.resolve(msg)
        } catch (e: Exception) {
            promise.reject("ERR_NATIVE", e)
        }
    }

    @ReactMethod
    fun showApps(promise: Promise) {
        try {
            val apps: List<String> = LoadFrida.listAppsC()
            val result = WritableNativeArray()
            apps.forEach { result.pushString(it) }
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("ERR_LIST_APPS", e)
        }
    }

    @ReactMethod
    fun spawnApp(packageName: String, promise: Promise) {
        try {

            val pid = LoadFrida.spawnAppC(packageName)
            if (pid !== "pid") {
                promise.resolve("spawn $packageName with pid : $pid")
            } else {
                promise.reject("ERR_SPAWN" + pid)
            }

        } catch (e: Exception) {
            promise.reject("ERR_SPAWN", e);

        }
    }

    @ReactMethod
    fun load_script(packageName: String, scriptName: String, promise: Promise) {
        try {

            val result = LoadFrida.loadScriptC(packageName, scriptName)
            if (result == "SUCCESS") {
                promise.resolve("spawn $packageName with $scriptName")
            } else {
                promise.reject("ERR_LOAD_SCRIPT123", result)
            }

        } catch (e: Exception) {
            promise.reject("ERR_LOAD_SCRIPT", e);

        }
    }
    
}
