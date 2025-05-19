const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Currently using in-memory storage for OTPs
// Using a database to store OTPs ???
const otpStore = new Map();

app.post('/api/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    otpStore.set(email, {
        code: otp,
        timestamp: Date.now()
    });

    console.log(`OTP for ${email}: ${otp}`);
    
    res.json({ success: true });
});

app.post('/api/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    const storedData = otpStore.get(email);
    
    if (!storedData || storedData.code !== otp || Date.now() - storedData.timestamp > 300000) {
        return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }
    
    otpStore.delete(email); 
    res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});