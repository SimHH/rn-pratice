import React, { useEffect, useState } from "react";
import { View, Text, NativeModules, FlatList, ScrollView, TouchableOpacity, Alert } from "react-native";
import styles from "../../style";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

const { FridaFunc } = NativeModules;

type LoginScreenNavigationProp = NativeStackNavigationProp<
                                    RootStackParamList, 
                                    "Login">;

export default function Home() {
  const [apps, setApps] = useState<string[]>([]);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    FridaFunc.showApps()
      .then((result: string[]) => {
        setApps(result);
      })
      .catch((error: any) => {
        console.error("Native call failed : ", error);
      });
  }, []);

  useEffect


  return (
    <FlatList
      data={apps}
      keyExtractor={(item, idx) => idx.toString()}
      renderItem={({ item }) => (

        <TouchableOpacity
          style={styles.listTouchable}
          onPress={() => {
            // FridaFunc.spawnApp(item)
            //   .then((msg: any) => console.log(msg))
            //   .catch((err: any) => console.error(err));
            navigation.navigate("SelectScript", { appName: item });



          }}
        >
          <Text style={styles.list}>{item}</Text>
          
        </TouchableOpacity>
      )}
    />
  );
}
