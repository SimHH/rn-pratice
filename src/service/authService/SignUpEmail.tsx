import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { fireStoreDB, auth } from "../../config/firebaseConfig";

export async function SignUp(email: string, password: string) {

    if (!email || !password) {
        throw new Error("아이디와 비밀번호를 입력하세요");
    }

    // firestore check Email
    try {
        const ref = doc(fireStoreDB, "allowUser" , email);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
            throw new Error("등록되지 않은 이메일입니다.");
        }

        const data = snap.data();
        if (data.permission === false) {
            throw new Error("허용되지 않은 이메일입니다.");
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;

    }
    catch (err: any) {
        switch (err.code) {
            case "auth/email-already-in-use":
                throw new Error("이미 사용 중인 이메일입니다.");
            case "auth/invalid-email":
                throw new Error("올바른 이메일 형식이 아닙니다.");
            case "auth/weak-password":
                throw new Error("비밀번호는 최소 6자 이상이어야 합니다.");
        }
        throw err;
    }
}