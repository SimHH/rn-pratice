cmake_minimum_required(VERSION 3.4.1)
project(frida_jni)

# JNI 코드
add_library(frida-jni SHARED frida_jni.c)

# Frida Core 정적 라이브러리
add_library(frida-core STATIC IMPORTED)
set_target_properties(frida-core PROPERTIES IMPORTED_LOCATION
    ${CMAKE_SOURCE_DIR}/libs/${ANDROID_ABI}/libfrida-core.a
)

# 헤더 포함 경로
include_directories(${CMAKE_SOURCE_DIR}/include)

find_library(log-lib log)

target_link_libraries(frida-jni frida-core ${log-lib})
