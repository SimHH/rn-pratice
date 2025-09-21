import React, { useEffect, useState } from "react";
import { View, Text, NativeModules, FlatList, ScrollView, TouchableOpacity, Alert } from "react-native";
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
    <FlatList
      data={apps}
      keyExtractor={(item, idx) => idx.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            FridaFunc.spawnApp(item)
              .then((msg: any) => console.log(msg))
              .catch((err: any) => console.error(err));
          }}
        >
          <Text style={styles.appList}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
