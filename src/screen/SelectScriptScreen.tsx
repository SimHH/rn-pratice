import { NativeModules, View, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import ScriptList from "../utils/scriptList";
import styles from "../../style";

type SelectScriptRouteProp = RouteProp<RootStackParamList, "SelectScript">;
const { FridaFunc } = NativeModules;

export default function SelectScript({ route }: { route: SelectScriptRouteProp }) {
  const { appName } = route.params;

  return (
    <View>
      <Text style={styles.selectAppName}>{appName}</Text>
      <ScriptList
        onSelect={(fileName: string) => {
          FridaFunc.load_script(appName, fileName)
            .then((msg: any) => console.log(msg))
            .catch((err: any) => console.error(err));
        }}
      />
    </View>
  );
}
