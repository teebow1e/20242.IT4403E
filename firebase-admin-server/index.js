import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import { AdminService } from './AdminService.js';

const app = express();

app.use(cors());
app.use(express.json());

/**
 * GET /list-users
 * Return every user (uid, displayName, email, role, creationTime)
 */
app.get('/list-users', async (req, res) => {
  try {
    const result = await AdminService.listAllUsers();
    res.status(result.success ? 200 : 400).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * POST /update-user
 * Body: { uid, displayName, email, role, [password] }
 * Updates Auth record + role in Realtime DB.
 */
app.post('/update-user', async (req, res) => {
  const { uid, displayName, email, role } = req.body;
  const accountData = { displayName, email, role };
  const result = await AdminService.updateAccount(uid, accountData);
  res.status(result.success ? 200 : 400).json(result);
});

/**
 * POST /delete-user
 * Body: { uid }
 * Deletes user from Auth and Realtime DB.
 */
app.post('/delete-user', async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res
      .status(400)
      .json({ success: false, message: 'uid is required' });
  }

  const result = await AdminService.deleteAccount(uid);
  res.status(result.success ? 200 : 400).json(result);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
<<<<<<< HEAD
  console.log(`Admin server listening on port ${PORT}`);
=======
    console.log(`Admin server listening on port ${PORT}`);
>>>>>>> dc3ef9141552acd413bde7eb31fd74b1dc744eef
});
