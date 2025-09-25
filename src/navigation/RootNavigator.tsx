import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import LoginScreen from "../screen/LoginScreen";
import HomeTabs from "../screen/HomeTabs";
import SelectScriptScreen from "../screen/SelectScriptScreen";
import SettingScreen from "../screen/SettingScreen";
import AppInfoScreen from "../screen/AppInfoScreen";
import ScriptManage from "../screen/ScriptManageScreen";
import ScriptPush from "../screen/ScriptPushScreen";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <RootStack.Navigator initialRouteName="Login">
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen
        name="Home"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="SelectScript" component={SelectScriptScreen} />
      <RootStack.Screen name="Setting" component={SettingScreen} />
      <RootStack.Screen name="AppInfo" component={AppInfoScreen} />
      <RootStack.Screen name="ScriptManage" component={ScriptManage} />
      <RootStack.Screen name="ScriptPush" component={ScriptPush} />
    </RootStack.Navigator>
  );
}