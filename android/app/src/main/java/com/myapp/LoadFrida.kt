package com.myapp

object LoadFrida {
    init {
        System.loadLibrary("frida-jni")
    }

    external fun getMessageC(): String

    external fun listAppsC(): List<String>

    external fun spawnAppC(packageName: String): String

    external fun loadScriptC(packageName: String, scriptName: String): String
}
