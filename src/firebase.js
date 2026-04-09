import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMqu-kB2ccfxZXA9iLP6RadBYliR87CAs",
  authDomain: "aiinterviewpreparation-9f159.firebaseapp.com",
  projectId: "aiinterviewpreparation-9f159",
  storageBucket: "aiinterviewpreparation-9f159.firebasestorage.app",
  messagingSenderId: "680365748721",
  appId: "1:680365748721:web:34c5680fceaab61af69450",
  measurementId: "G-9N5WB8J95Q"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();