import {initializeApp} from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA0DUtxPP0_EIHRd_vEKKxpRpXhjmp7H6k",
    authDomain: "it4403e.firebaseapp.com",
    projectId: "it4403e",
    storageBucket: "it4403e.firebasestorage.app",
    messagingSenderId: "16977471090",
    appId: "1:16977471090:web:a6aaf08fccedf46cf644eb",
    measurementId: "G-730QK8HM9C"
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
