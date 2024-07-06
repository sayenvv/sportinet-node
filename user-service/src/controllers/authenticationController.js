const User = require("../../../models/user");
const { UserTypes, AccountTypes } = require("../../constants/enums");
const {
  isOTPValid,
  generateOTP,
  generateJwtToken,
} = require("../helpers/authentication");
const {
  OTP_ALREADY_SEND,
  OTP_SEND,
  OTP_VERIFIED,
  OTP_EXPIRED,
  ACCOUNT_EXISTS,
  ACCOUNT_NOT_EXISTS,
  INVALID_PHONE,
  SOMETHING_WENT_WRONG,
} = require("../../constants/messages");

const register = async (req, res) => {
  const { phone } = req.body; // Extract phone number from request body

  try {
    // Check if user with the given phone number already exists
    let existingUser = await User.findOne({ phone });

    if (existingUser) {
      // User exists, check OTP validity and account status
      if (
        (!isOTPValid(existingUser.created_at) &&
          existingUser.account_status === AccountTypes.PENDING) ||
        (existingUser.temp_otp == null &&
          existingUser.account_status === AccountTypes.PENDING)
      ) {
        // Regenerate OTP
        const otp = generateOTP();
        existingUser.temp_otp = otp;
        existingUser.updated_at = Date.now();
        await existingUser.save();
      } else {
        // User is not eligible for OTP update, handle accordingly
        return res.status(422).json({ message: OTP_ALREADY_SEND });
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

    res.status(200).json({ message: OTP_SEND });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: SOMETHING_WENT_WRONG });
  }
};

const verify_otp = async (req, res) => {
  const { phone, otp } = req.body; // Extract phone number and OTP from request body

  try {
    // Find the user based on the phone number
    let current_user = await User.findOne({ phone });

    if (current_user) {
      // User found, check account status
      if (current_user.account_status === AccountTypes.PENDING) {
        // Check if OTP is valid and matches
        if (
          current_user.temp_otp === otp &&
          isOTPValid(current_user.created_at)
        ) {
          // Update account status to ACTIVE
          current_user.account_status = AccountTypes.ACTIVE;
          current_user.temp_otp = null; // Clear temp_otp
          await current_user.save();

          // Generate JWT token for the user
          const jwtToken = generateJwtToken({ payload: current_user });

          // Send success response with JWT token
          res.status(200).json({ message: OTP_VERIFIED, token: jwtToken });
        } else {
          // OTP verification failed (expired or invalid)
          current_user.temp_otp = null; // Clear temp_otp
          await current_user.save();
          res.status(422).json({ message: OTP_EXPIRED });
        }
      } else if (current_user.account_status === AccountTypes.ACTIVE) {
        // User account is already active
        res.status(422).json({ message: ACCOUNT_EXISTS });
      } else {
        // Invalid request
        res.status(422).json({ message: ACCOUNT_NOT_EXISTS });
      }
    } else {
      // User not found with the given phone number
      res.status(422).json({ message: INVALID_PHONE });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: SOMETHING_WENT_WRONG });
  }
};

module.exports = { register, verify_otp };
