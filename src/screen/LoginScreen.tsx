import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Modal, Alert } from "react-native";
import styles from "../../style";
import SignUpModal from "../components/authComponent/SignUp";
import { SignIn } from "../service/authService/SignInEmail";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp} from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";



type LoginScreenNavigationProp = NativeStackNavigationProp<
                                    RootStackParamList, 
                                    "Login">;



export default function LoginScreen() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handleLogin = async () => {
        try {
            // const user = await SignIn(id, password);
            const user = await SignIn("test@test.com", "11111111");
            Alert.alert(`로그인 성공 ${user.email}`);
            
            navigation.navigate("Home")

        } catch (err: any) {
            Alert.alert("로그인 실패", err.message);
        }

    }

    return (

        <View style={styles.container}>
            <Text style={styles.title}>
                {"\n\n"}Mobile Pentest
            </Text>

            <TextInput
                style={styles.TextInput}
                placeholder="아이디"
                value={id}
                onChangeText={setId}
            />
            <TextInput
                style={styles.TextInput}
                placeholder="비밀번호"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>

            <View style={styles.loginBottom}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.loginBottomText}>회원가입</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.loginBottomText}>ID/PW 찾기</Text>
                </TouchableOpacity>
            </View>

                <SignUpModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    />

        </View>
        
        
    )


}

