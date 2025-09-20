import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import LoginScreen from "./src/screen/LoginScreen";
import HomeScreen from "./src/screen/HomeScreen"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

