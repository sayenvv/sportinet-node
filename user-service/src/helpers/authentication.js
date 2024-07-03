// const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY_TTL = process.env.TOKEN_EXPIRY_TTL;

function isOTPValid(createdAt) {
    const currentTimestamp = new Date();
    const fifteenMinutesInMillis = 15 * 60 * 1000; // 15 minutes in milliseconds
    const otpTimestamp = new Date(createdAt);

    return currentTimestamp - otpTimestamp <= fifteenMinutesInMillis;
}

function generateOTP() {
    // Generate a random 6-digit code (you can adjust the length)
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTPViaTwilio(phoneNumber, otp) {
    try {
        await twilioClient.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
        });
        console.log(`OTP sent to ${phoneNumber}`);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
}

function generateJwtToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { TOKEN_EXPIRY_TTL });
}

module.exports ={
    isOTPValid,
    generateOTP,
    sendOTPViaTwilio,
    generateJwtToken
}