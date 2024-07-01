const User = require('../../../models/user');
const {UserTypes,AccountTypes} = require('../../constants/enums')
const {isOTPValid,generateOTP} = require('../helpers/authentication')



  const register = async (req, res) => {
    const { phone } = req.body;

    try {
        // Check if user with the given phone number already exists
        let existingUser = await User.findOne({ phone });

        if (existingUser) {
            // User exists, check OTP validity and account status
            if (!isOTPValid(existingUser.created_at) && existingUser.account_status === AccountTypes.PENDING) {
                // Regenerate OTP
                const otp = generateOTP();
                existingUser.temp_otp = otp;
                existingUser.updated_at = Date.now()
                await existingUser.save();
            } else {
                // User is not eligible for OTP update, handle accordingly
                return res.status(422).json({ message: "User is not eligible for OTP update" });
            }
        } else {
            // User does not exist, create a new user
            const otp = generateOTP();
            existingUser = await User.create({
                phone: phone,
                temp_otp: otp,
                user_type: UserTypes.PLAYER, // Assuming UserTypes is defined and PLAYER is a valid type
            });
        }

        // Send OTP via Twilio (example)
        // await sendOTPViaTwilio(phone, existingUser.temp_otp);

        res.status(200).json({ message: `OTP sent to your phone ${existingUser.temp_otp}` });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error during registration' });
    }
};



const verify_otp = async (req,res) => {
    const { phone, otp } = req.body;

    current_user = await User.findOne({ phone: phone })
    console.log(isOTPValid(current_user.created_at),current_user.temp_otp ,otp);
    if (current_user.temp_otp == otp && !isOTPValid(current_user.created_at)) {
        // Update account status to ACTIVE
        current_user.account_status = AccountTypes.ACTIVE;
        await current_user.save();

        res.status(200).json({ message: "OTP verified successfully" });
    } else {
        res.status(422).json({ message: "OTP has expired or is invalid" });
    }
}

module.exports = { register ,verify_otp};
