import { getAuth } from "firebase-admin/auth";

import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://it4403e-default-rtdb.asia-southeast1.firebasedatabase.app/',
    });
}

export const AdminService = {
    createAccount: async (accountData) => {
        try {
            const userRecord = await getAuth().createUser({
                email: accountData.email,
                password: accountData.password,
                displayName: accountData.displayName,
            })
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);

            // Add user to Realtime Database
            const db = admin.database();
            const dbRef = ref(db, `users/${userRecord.uid}`);
            await set(dbRef, {
                role: accountData.role,
            });
            return {
                success: true,
                message: 'Account created successfully',
            };
        } catch (error) {
            console.log('Error creating new user:', error);
            return {
                success: false,
                message: error.message || 'Failed to add account'
            };
        };
    },

    listAllUsers: async () => {
        const users = [];
        try {
            // Fetch all users from Firebase Authentication & Realtime Database
            // includes uid, displayName, email, creationTime and role
            // List batch of users, 1000 at a time.
            const listUsersResult = await getAuth().listUsers();
            for (const userRecord of listUsersResult.users) {
                const dbRef = admin.database().ref(`users/${userRecord.uid}`);
                const snapshot = await dbRef.get();
                const role = snapshot.exists() ? snapshot.val().role : 'unknown';

                users.push({
                    uid: userRecord.uid,
                    displayName: userRecord.displayName,
                    email: userRecord.email,
                    role: role,
                    creationTime: userRecord.metadata.creationTime,
                });
            }
            // if (listUsersResult.pageToken) {
            //     // List next batch of users.
            //     listAllUsers(listUsersResult.pageToken);
            // }
            return {
                success: true,
                message: users
            };
        } catch (error) {
            console.log('Error listing users:', error);
            return {
                success: false,
                message: error.message || 'Failed to list users'
            };
        };
    },

    deleteAccount: async (uid) => {
        try {
            await getAuth().deleteUser(uid);
            // Delete user from Realtime Database
            await admin.database().ref(`users/${uid}`).remove();
            return {
                success: true,
                message: 'User deleted successfully'
            };
        } catch (error) {
            console.log('Error deleting user:', error);
            return {
                success: false,
                message: error.message || 'Failed to delete user'
            };
        };
    },

    updateAccount: async (uid, accountData) => {
        try {
            // Update user data in Firebase Authentication
            await getAuth().updateUser(uid, {
                email: accountData.email,
                password: accountData.password,
                displayName: accountData.displayName,
            });
            // Update role in Firebase Realtime Database
            const db = admin.database();
            const dbRef = ref(db, `users/${uid}`);
            await set(dbRef, { role: accountData.role });
            return {
                success: true,
                message: 'Account updated successfully'
            };
        } catch (error) {
            console.error('Error updating account:', error);
            return { 
                success: false, 
                message: error.message || 'Failed to update account' 
            };
        }
    },

    getUserByEmail: async (email) => {
        try {
            const userRecord = await getAuth().getUserByEmail(email);
            return {
                success: true,
                message: userRecord
            };
        } catch (error) {
            console.error('Error getting user by email:', error);
            return { 
                success: false, 
                message: error.message || 'Failed to get user by email' 
            };
        }
    }
}

