import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import styles from "../../style";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
    return (
        <Tab.Navigator 
            screenOptions= {{
                tabBarStyle: {
                    height: 80,
                    backgroundColor: "black",
                },
                tabBarLabelStyle: {
                    fontSize: 16,
                },
            }}>
            <Tab.Screen name = "앱 목록" component={HomeScreen} />
            <Tab.Screen name = "설정" component={SettingScreen} />
        </Tab.Navigator>
    )
}