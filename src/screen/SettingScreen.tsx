import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { View, Text, TouchableOpacity } from "react-native";

type SettingScreenNavigationProp = NativeStackNavigationProp<
                                    RootStackParamList, 
                                    "Setting">;

export default function SettingScreen() {

    return (
        <View>
            <Text>
                설정
            </Text>
        </View>
    );

}