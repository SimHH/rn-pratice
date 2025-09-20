package com.myapp

object LoadFrida {
    init {
        System.loadLibrary("frida-jni")
    }

    external fun getMessage(): String

    external fun listApps(): List<String>

    external fun spawnApp(packageName: String): Int
}
