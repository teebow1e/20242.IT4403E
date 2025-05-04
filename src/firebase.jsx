import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyA0DUtxPP0_EIHRd_vEKKxpRpXhjmp7H6k",
    authDomain: "it4403e.firebaseapp.com",
    projectId: "it4403e",
    databaseURL: 'https://it4403e-default-rtdb.asia-southeast1.firebasedatabase.app/',
    storageBucket: "it4403e.firebasestorage.app",
    databaseURL: "https://it4403e-default-rtdb.asia-southeast1.firebasedatabase.app/",
    messagingSenderId: "16977471090",
    appId: "1:16977471090:web:a6aaf08fccedf46cf644eb",
    measurementId: "G-730QK8HM9C"
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp);