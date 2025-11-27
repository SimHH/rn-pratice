import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import styles from "../../style";

type SettingsNav = NativeStackNavigationProp<
                            RootStackParamList,
                            "Setting">;

const menuItems: { id: string; title: string; route: keyof RootStackParamList }[] = [
  { id: "1", title: "스크립트 관리", route: "ScriptManage" },
  { id: "2", title: "스크립트 Push", route: "ScriptPush" },
  { id: "3", title: "앱 정보", route: "AppInfo" },
];

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsNav>();

  return (
    <View>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listTouchable}
            onPress={() => navigation.navigate(item.route as any, undefined)}
          >
            <Text style={styles.list}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
