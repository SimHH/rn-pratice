import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBlwBrJ-kamHYatVLyY6vUeltKXLLm3QIc",
  authDomain: "myapp-aeda7.firebaseapp.com",
  projectId: "myapp-aeda7",
  storageBucket: "myapp-aeda7.firebasestorage.app",
  messagingSenderId: "976459833664",
  appId: "1:976459833664:web:146e80ca6db42f43f31aa5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fireStoreDB = getFirestore(app);