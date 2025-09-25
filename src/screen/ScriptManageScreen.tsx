import React from "react";
import {Text, View, Alert } from "react-native";
import ScriptList from "../utils/scriptList";

export default function ScriptManage() {

    return (
        <View>
            <ScriptList onSelect={(filename: string) => {

                Alert.alert("select = ", filename)

            }} />
        </View>
    )
}