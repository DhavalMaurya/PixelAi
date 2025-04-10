const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const mailSender = require("../utils/mailSender")

exports.signUp = async (req, res) => {

    const { name, email, password, } = req.body;

    try {
        //validate fields
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, messagae: "All fields require" });
        }

        //check for user existience
        const userExist = await User.findOne({ email });
        
        if (userExist) {
            return res.status(400).json({ success: false, message: "User already exist" });
        }

        //hash password with bcrypt
        const hashesPassword = await bcrypt.hash(password, 10)

        //add user in database 
        const user = await User.create({
            name,
            email,
            password: hashesPassword,
        })

        //return response
        res.status(201).json({ success: true, message: "User registered successfully", user })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error, message: "Something went wrong while creating user" })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //validate fields
        if (!email || !password) {
            return res.status(400).json({ success: false, messagae: "All fields require" });
        }

        //check for user existience
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        //check password with bcrypt
        const isMatch = await bcrypt.compare(password, userExist.password);

        if (isMatch) {
            //if password match then genrate token
            const payload = { email: email, id: userExist._id, role: userExist.role }
            const token = jwt.sign(payload, "pixel", { expiresIn: "30h" })
            userExist.token = token;
            res.cookie("token", token, { expires: new Date(Date.now() + 30 * 34 * 60 * 1000) }).status(200).json({ success: true, message: "Login successfully", user: userExist , token})
        } else {
            return res.status(400).json({ success: false, message: "Password is incorrect" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: error, message: "Something went wrong while login" });
    }
}

exports.resetPasswordToken = async (req, res) => {
    try {

        const { email } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ success: false, message: "This email is not registerd with us , Try with different email" })
        }

        const token = crypto.randomUUID();

        const updatedDetails = await User.findOneAndUpdate({ email }, { token: token, reset_password_expiry: Date.now() + 5 * 60 * 1000 }, { new: true });

        const url = `http/localhost:3000/choose-passwword/${token}`;
        const body = url;

        await mailSender(email, "Reset password link", body);

        return res.status(200).json({ success: false, message: "check your mail for reset password", token });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong", error })
    }
}

exports.resetPassword = async (req, res) => {

    try {
        const { password, token } = req.body;

        //fetch user from db with token
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid token" })
        }


        //check token if expiry
        if (Date.now() > user.reset_password_expiry) {
            return res.status(400).json({ success: false, message: "Token is expired , please regenrate it " });
        }
        console.log("yha ha")
        
        //hash password 
        const hashPassword = await bcrypt.hash(password, 10);

        //update password in db
        const updatedUser = await User.findByIdAndUpdate({ _id: user._id }, { password: hashPassword }, { new: true });

        // return response
        return res.status(200).json({ success: true, message: "Password reset successfully", updatedUser });


    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong , while reseting the password", error });
    }
}

exports.changePassword = async(req,res) =>{ 
    try {
        const {oldPassword , newPassword , email } = req.body;

        if(!oldPassword || !newPassword || !email){

        }

    } catch (error) {
        
    }
}

exports.updateProfile = async () =>{}