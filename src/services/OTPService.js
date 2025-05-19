const express = require("express");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const app = express();
app.use(express.json());

let otpSecrets = {}; 

app.post("/generate-otp", async (req, res) => {
    const userId = req.body.userId;
    const secret = speakeasy.generateSecret({ name: `Starbucks Checkout (${userId})` });

    otpSecrets[userId] = secret.base32;

    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);
    res.json({ qrCodeUrl });
});

app.post("/verify-otp", (req, res) => {
    const { userId, token } = req.body;
    const verified = speakeasy.totp.verify({
        secret: otpSecrets[userId],
        encoding: 'base32',
        token
    });

    res.json({ success: verified });
});

app.listen(5000, () => console.log("OTP server running on port 5000"));