import { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { Alert, NativeModules, View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "../../style";
import RNFS, {ReadDirItem} from "react-native-fs";


interface ScriptListProps {
  onSelect: (filename: string) => void;
}

export default function SelectScript({ onSelect }: ScriptListProps) {
  const [script, setScript] = useState<string[]>([]);

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
      <FlatList
        style={styles.listTouchable}
        data={script}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text style={styles.list} onPress={() => onSelect(item)}>
              {item}
            </Text>
          </TouchableOpacity>
        )}></FlatList>
    </View>
  );
}