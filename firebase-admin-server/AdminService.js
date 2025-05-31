import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync("./firebase-admin-server/serviceAccountKey.json")
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://it4403e-default-rtdb.asia-southeast1.firebasedatabase.app/",
  });
}

const ok  = (msg) => ({ success: true,  message: msg });
const err = (e, fallback) =>
  ({ success: false, message: e?.message || fallback });

export const AdminService = {
  async createAccount({ email, password, displayName, role }) {
    try {
      const user = await getAuth().createUser({ email, password, displayName });
      await admin.database().ref(`users/${user.uid}`).set({ role });
      return ok("Account created successfully");
    } catch (e) {
      console.error("createAccount:", e);
      return err(e, "Failed to add account");
    }
  },

  async listAllUsers() {
    try {
      const { users } = await getAuth().listUsers();
      const enriched = await Promise.all(
        users.map(async (u) => {
          const snap = await admin.database().ref(`users/${u.uid}`).get();
          return {
            uid: u.uid,
            displayName: u.displayName,
            email: u.email,
            role: snap.exists() ? snap.val().role : "unknown",
            creationTime: u.metadata.creationTime,
          };
        })
      );
      return ok(enriched);
    } catch (e) {
      console.error("listAllUsers:", e);
      return err(e, "Failed to list users");
    }
  },

  async deleteAccount(uid) {
    try {
      await getAuth().deleteUser(uid);
      await admin.database().ref(`users/${uid}`).remove();
      return ok("User deleted successfully");
    } catch (e) {
      console.error("deleteAccount:", e);
      return err(e, "Failed to delete user");
    }
  },

  async updateAccount(
    uid,
    { email, displayName, role } 
  ) {
    try {
      const authUpdate = {};
      if (email)       authUpdate.email       = email;
      if (displayName) authUpdate.displayName = displayName;

      if (Object.keys(authUpdate).length) {
        await getAuth().updateUser(uid, authUpdate);
      }

      if (role) {
        await admin.database().ref(`users/${uid}`).set({ role });
      }

      return ok("Account updated successfully");
    } catch (e) {
      console.error("updateAccount:", e);
      return err(e, "Failed to update account");
    }
  },

  async getUserByEmail(email) {
    try {
      const user = await getAuth().getUserByEmail(email);
      return ok(user);
    } catch (e) {
      console.error("getUserByEmail:", e);
      return err(e, "Failed to get user by email");
    }
  },
};
