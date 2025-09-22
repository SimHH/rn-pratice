import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import CryptoJS from "crypto-js";
import RNFS from "react-native-fs";
import { fireStoreDB, auth } from "../config/firebaseConfig";

export async function initScript() {

    const KeySnap = await getDoc(doc(fireStoreDB, "Key", "scriptKey"));
    const secretKey = KeySnap.data()?.secretKey;

    try {
        const querySnapshot = await getDocs(collection(fireStoreDB, "script"))

        for (const docSnap of querySnapshot.docs) {

            const docId = docSnap.id;

            if (docId.includes("iOS")) {
                continue;
            }

            const encrypted = docSnap.data().encScript;

            const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);

            const dir = `${RNFS.DocumentDirectoryPath}/scripts`;
            const dirExists = await RNFS.exists(dir);
            if (!dirExists) {
                await RNFS.mkdir(dir);
            }

            const path = `${dir}/${docId}.js`;

            const fileExists = await RNFS.exists(path);
            if (fileExists) {
                const oldContent = await RNFS.readFile(path, "utf8");
                if (oldContent === decrypted) {
                    console.log("not update")
                } else {
                    await RNFS.writeFile(path, decrypted, "utf8");
                    console.log("update complete");
                }
            } else {
                await RNFS.writeFile(path, decrypted, "utf8");
            }
        }
    } catch(err: any) {
        throw new Error(err);
    }

}
