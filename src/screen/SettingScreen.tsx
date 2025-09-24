import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Text } from "react-native";

type SettingScreenNavigationProp = NativeStackNavigationProp<
                                    RootStackParamList, 
                                    "Setting">;

export default function SettingScreen() {

    return (
        <Text>
            설정
        </Text>
    );

}