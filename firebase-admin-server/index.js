import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

const app = express();

import { AdminService } from './AdminService.js';

app.use(cors());
app.use(express.json());

app.get('/list-users', async (req, res) => {
    try {
        const users = await AdminService.listAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/user', async (req, res) => {
    try {
        const email = req.query.email;
        console.log("Fetching user by email:", email);
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            throw new Error('Invalid email address provided');
        }
        const user = await AdminService.getUserByEmail(email);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

app.put('/user', async (req, res) => {
    try {
        const { displayName, email, role } = req.body;
        const uid = req.params.uid;
        const user = await AdminService.updateAccount(uid, {
            displayName,
            email,
            role
        });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/user', async (req, res) => {
    try {
        const uid = req.params.uid;
        await AdminService.deleteUser(uid);
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Admin server listening on port ${PORT}`);
});
