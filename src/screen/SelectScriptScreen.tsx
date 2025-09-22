import { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { Alert, NativeModules, View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "../../style";
import RNFS, {ReadDirItem} from "react-native-fs";


type SelectScriptRouteProp = RouteProp<RootStackParamList, "SelectScript">;

const { FridaFunc } = NativeModules;

export default function SelectScript({ route }: { route: SelectScriptRouteProp }) {
  const { appName } = route.params;
  const [script, setScript] = useState<String[]>([]); 

  useEffect(() => {
      async function loadFiles() {
        try {
          const dir = `${RNFS.DocumentDirectoryPath}/scripts`;

          const fileList: ReadDirItem[] = await RNFS.readDir(dir);

          const names = fileList
            .filter(item => item.isFile())
            .map(item => item.name);

          setScript(names);
        } catch (err: any) {
          throw new Error(err);
        }
      }
      loadFiles();
  }, []);

  return (
    <View>
      <Text style={styles.selectAppName}>
        {appName}
      </Text>
      <FlatList
        data={script}
        style={styles.appListTouchable}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => 
              FridaFunc.load_script(appName, item)
                .then((msg: any) => console.log(msg))
                .catch((err: any) => console.log(err))}>
              <Text style={styles.appList}>
                {item}
              </Text>
          </TouchableOpacity>
        )}>
      </FlatList>
    </View>
  );
}