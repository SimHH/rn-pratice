import React, { useState } from "react";
import { View, TextInput, Button, Text, Modal, TouchableOpacity, Alert } from "react-native";
import styles from "../../../style"
import { SignUp } from "../../service/authService/SignUpEmail";


interface SignUpModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SignUpModal({visible, onClose}: SignUpModalProps) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleSignUp = async () => {

      try {
        const user = await SignUp(email, password);
        Alert.alert(`회원가입 성공 ${user.email}`);
        onClose();
      }
      catch (err) {
        Alert.alert("실패" + err)
      }


    }
  
  
  return (
    <Modal 
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      >
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>

        <TouchableOpacity style={styles.modalClose} onPress={onClose}>
          <Text style={styles.modalCloseText}>X</Text>
        </TouchableOpacity>

          <Text style={styles.title}>회원가입</Text>

          <TextInput 
            placeholder="아이디" 
            value={email}
            style={styles.TextInput}
            onChangeText={setEmail}
            />
          <TextInput 
            placeholder="비밀번호" 
            value={password}
            secureTextEntry 
            style={styles.TextInput}
            onChangeText={setPassword}
            />

          <TouchableOpacity style={styles.confirmBtn} onPress={handleSignUp}>
            <Text style={styles.confirmText}>회원가입</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}