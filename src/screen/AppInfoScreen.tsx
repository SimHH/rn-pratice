import React, { useState, useEffect } from "react";
import { View, Text} from "react-native";
import DeviceInfo from "react-native-device-info";
import styles from "../../style"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type AppInfoNav = NativeStackNavigationProp<
                                    RootStackParamList, 
                                    "AppInfo">;

export default function AppInfo() {
    const [appName, setAppName] = useState("");
    const [bundleId, setBundleId] = useState("");
    const [version, setVersion] = useState("");
    const [build, setBuild] = useState("");

    useEffect(() => {
        setAppName(DeviceInfo.getApplicationName());
        setBundleId(DeviceInfo.getBundleId());
        setVersion(DeviceInfo.getVersion());
        setBuild(DeviceInfo.getBuildNumber());
    }, []);

    return (
    <View style={styles.container}>
      <Text style={styles.title}>앱 정보</Text>
      <Text>이름: {appName}</Text>
      <Text>패키지: {bundleId}</Text>
      <Text>버전: v{version}</Text>
      <Text>빌드 번호: {build}</Text>
    </View>
  );
}