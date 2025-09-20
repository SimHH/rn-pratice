import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

export async function SignIn(id: string, password: string) {

    try {
        const userCredential = await signInWithEmailAndPassword(auth, id, password);
        return userCredential.user;
    } catch (err: any) {
        throw new Error(err);
    }
    
}