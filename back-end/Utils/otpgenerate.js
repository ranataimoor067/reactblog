import {User} from '../models/user.model.js';
import OTP from '../models/otp.model.js';
import otpgenerator from 'otp-generator';
import { sendMail } from './mailsender.js';

export const genrateOtp = async (req, res) => {
    try {
        const email = req.body.email;
        console.log(email);

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(409).json({
                success: false,
                message: "User already registered"
            });
        }

        let otp;
        let findOTP;

        do {
            otp = otpgenerator.generate(6, {
                specialChars: false,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false
            });
            findOTP = await OTP.findOne({ otp });
        } while (findOTP);

        const finalOTP = await OTP.create({ email, otp });

        await sendMail(
            email,
            "OTP FOR REGISTRATION",
            finalOTP.otp
        );

        return res.status(200).json({
            success: true,
            message: "OTP Generated",
            OTP: finalOTP
        });

    } catch (err) {
        console.error("Error while generating OTP:", err);
        return res.status(500).json({
            success: false,
            message: "Error while generating OTP",
            error: err.message
        });
    }
};

export const generateOTPForDelete = async (req, res) => {
    try {
        const email = req.body.email;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        let otp;
        let findOTP;

        do {
            otp = otpgenerator.generate(6, {
                specialChars: false,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false
            });
            findOTP = await OTP.findOne({ otp });
        } while (findOTP);

        const finalOTP = await OTP.create({ email, otp });

        await sendMail(
            email,
            "OTP FOR DELETE ACCOUNT",
            finalOTP.otp
        );

        return res.status(200).json({
            success: true,
            message: "OTP Generated",
            OTP: finalOTP
        });

    } catch (err) {
        console.error("Error while generating OTP:", err);
        return res.status(500).json({
            success: false,
            message: "Error while generating OTP",
            error: err.message
        });
    }
}
