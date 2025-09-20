import React, { useEffect, useState } from "react";
import { View, Text, NativeModules, TouchableOpacity, Alert } from "react-native";
import styles from "../../style";

const { FridaFunc } = NativeModules;

export default function Home() {
  const [apps, setApps] = useState<string[]>([]);

  useEffect(() => {
    FridaFunc.showApps()
      .then((result: string[]) => {
        setApps(result);
      })
      .catch((error: any) => {
        console.error("Native call failed : ", error);
      });
  }, []);


  return (
    <View>
      {apps.map((app, idx) => (
        <TouchableOpacity key={idx} onPress={() => {
            FridaFunc.spawnApp(app)
                .then((msg: any) => console.log(msg))
                .catch((err: any) => console.error(err));
        }}>
          <Text style={styles.appList}>
            {app}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
