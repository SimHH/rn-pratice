import { NativeModules, View, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
<<<<<<< HEAD
// import { RootStackParamList, SettingStackParamList } from "../navigation/types";
import { RootStackParamList } from "../navigation/types";
=======
import { RootStackParamList, SettingStackParamList } from "../navigation/types";
>>>>>>> 6a905d212a6a7b9f30176c34780a4a77467f25ae
import ScriptList from "../utils/scriptList";
import styles from "../../style";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type SelectScriptRouteProp = RouteProp<RootStackParamList, "SelectScript">;
const { FridaFunc } = NativeModules;

<<<<<<< HEAD
// const SettingStack = createNativeStackNavigator<SettingStackParamList>();
=======
const SettingStack = createNativeStackNavigator<SettingStackParamList>();
>>>>>>> 6a905d212a6a7b9f30176c34780a4a77467f25ae


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
