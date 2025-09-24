import React from "react";
import LoginScreen from "./src/screen/LoginScreen";
import HomeScreen from "./src/screen/HomeScreen"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "./src/navigation/types";
import SelectScriptScreen from "./src/screen/SelectScriptScreen";
import HomeTabs from "./src/screen/HomeTab";


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen 
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}/>
        <Stack.Screen name="SelectScript" component={SelectScriptScreen} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

