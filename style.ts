import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 50,
    },

    container: {
        flex: 1,
        justifyContent: "flex-start",
        padding: 30,
        backgroundColor: "#f9f9f9",
        paddingTop: 100,
    },

    

    TextInput: {
        padding: 10,
        backgroundColor: "#d0d0d0ff",
        marginTop: 25,
        fontSize: 20,
        borderWidth: 1,
        borderColor: "#646464ff",
        borderRadius: 15,
    },

    loginButton: {
        padding: 20,
        backgroundColor: "#4385ffff",
        borderRadius: 15,
        marginTop: 30,
        borderColor: "#646464ff",
        borderWidth: 1.5,
    },

    loginButtonText: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",

    },

    loginBottom: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",  
    },

    loginBottomText: {
        fontWeight: "bold",
        color: "#000000ff",
        fontSize: 16,
        backgroundColor: "rgba(79, 167, 255, 0.27)",
        padding: 18,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#646464ff",
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(108, 108, 108, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "box-none",
    },

    modalBox: {
        justifyContent: "center",
        width: "80%",
        backgroundColor: "#ffffffff",
        padding: 20,
        borderRadius: 10,
    },

    modalClose: {
        position: "absolute",
        top: 10,
        right: 10,
        padding: 5,
    },

    modalCloseText: {
        fontWeight: "bold",
        fontSize: 15,
        color: "black",
    },

    signupTextInput: {

    },

    signupText: {
        fontWeight: "bold",
        fontSize: 30,
        marginBottom: 60,
        backgroundColor: "#2f2f2f",

    },

    confirmBtn: {
        fontWeight: "bold",
        color: "red",
        backgroundColor: "#4ab9ffff",
        marginTop: 50,
        alignItems: "center",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#646464ff",
    },

    confirmText: {
        fontWeight: "bold",
        color: "black",
        fontSize: 20,
        padding: 10,
    },

    listTouchable: {
        borderBottomWidth: 0.3,
        borderTopWidth: 0.3,
        borderColor: "black",

    },

    list: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        padding: 10,
    },


    selectAppName: {
        color: "black",
        textAlign: "center",
        fontSize: 25,
        padding: 25,
        fontWeight: "bold",
    },

    scriptList: {
        color: "black",
        margin: 20,


    },

    bottomTab: {
        height: 80,
    }



})

export default styles;