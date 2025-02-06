import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: {
            type: Date,
            expires: 180
        }
    },
    {
        timestamps: true
    }
);

const OTP = mongoose.model('OTP', OTPSchema, "OTP");

export default OTP;