import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../firebase";

async function addAccount(accountData) {
    try {
        // Register account with Firebase Authentication
        const waiterCredential = await createUserWithEmailAndPassword(auth, accountData.email, accountData.password);
        // Save role in Firebase Realtime Database
        const db = getDatabase();
        const uid = waiterCredential.user.uid;
        const waiterRef = ref(db, `users/${uid}`);
        await set(waiterRef, {email: accountData.email, role: accountData.role});
        return { success: true, message: 'Account with specific role added successfully' };
    } catch (error) {
        console.error('Error adding account:', error);
        return { success: false, message: error.message || 'Failed to add account' };
    }
}

