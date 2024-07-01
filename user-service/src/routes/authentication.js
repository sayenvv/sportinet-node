const express = require('express');
const { register,verify_otp } = require('../controllers/authenticationController'); // Correct path to userController

const router = express.Router();

router.post('/register/',(req,res) => {
    register(req,res)
})

router.post('/verify-otp/',(req,res) => {
    verify_otp(req,res)
})

module.exports = router