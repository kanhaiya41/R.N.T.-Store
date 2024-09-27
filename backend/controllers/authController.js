import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserReq from "../models/userReq.js";
import { upload, uploadToGridFs } from "../middlewares/upload.js";
import issuedItems from "../models/issuedItems.js";
import issueReq from "../models/issueReq.js";
import submitReq from "../models/submitReq.js";
import nodemailer from 'nodemailer'

export const SginInUser = async (req, res) => {
    if (!req.file) {
        return res.status(400).json('Profile pic not found');
    }
    const { username, email, mobile, password } = req.body;
    if (!username || !email || !mobile || !password) {
        return res.status(401).json({
            success: false,
            message: 'Something is missing,Please cheack!'
        });
    }
    const imageUrl = `https://r-n-t-store.onrender.com/file/${req.file.originalname}`;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const existUser = await User.findOne({ username });
        const existUserReq = await UserReq.findOne({ username });
        const existUseremail = await User.findOne({ email });
        const existUserReqemail = await UserReq.findOne({ email });
        const existUsermobile = await User.findOne({ mobile });
        const existUserReqmobile = await UserReq.findOne({ mobile });

        if (existUseremail || existUserReqemail) {
            return res.status(500).json({
                success: false,
                message: 'Try with a differend email!'
            });
        }

        if (existUsermobile || existUserReqmobile) {
            return res.status(500).json({
                success: false,
                message: 'Duplicate mobile number!'
            });
        }

        if (username === 'Host') {
            if (existUser) {
                return res.status(500).json({
                    success: false,
                    message: 'Username not Available!'
                });
            }
            else {
                const usersign = await User({ username, email, mobile, password: hashedPassword, image: imageUrl });
                const us = await usersign.save();
                res.status(200).json({
                    success: true,
                    message: 'Sign up Successfully',
                    us
                })
            }
        }
        else {
            if (existUserReq || existUser) {
                return res.status(500).json({
                    success: false,
                    message: 'Username not Available!'
                });
            }
            else {
                const usersignReq = await UserReq({ username, email, mobile, password: hashedPassword, image: imageUrl });
                const us = await usersignReq.save();
                res.status(200).json({
                    success: true,
                    message: 'Sign Up Request Successfully send to Admin,wait for acception ☺️',
                    us
                });
            }
        }


    } catch (error) {

    }

}

export const Login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: 'something is missing,Please cheack!'
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect email or password!'
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(401).json({
                success: false,
                message: 'Incorrect email or password!'
            });
        }
        const token = jwt.sign({
            userId: user._id
        },
            process.env.SECRET_KEY,
            {
                expiresIn: '1d'
            }
        );
        if (user.username === 'Host') {
            return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
                success: true,
                message: `Welcome ${user.username}`,
                type: 'Admin',
                user
            });
        } else {
            return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
                success: true,
                message: `Welcome ${user.username}`,
                type: 'User',
                user
            });
        }


    } catch (error) {
        console.log("error while Login", error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.cookie('token', "", { maxAge: 0 }).json({
            success: true,
            message: 'Logged out Successfully'
        })
    } catch (error) {
        console.log("error while logout", error);
    }
}

export const editProfile = async (req, res) => {
    let success = false;
    let message = 'User not Updated';
    try {
        const { username, email, mobile, opassword, npassword } = req.body;
        const image = req.file;
        const user = await User.findById(req.id);

        if (!user) {
            return res.status(401).json({
                message: 'User not found'
            });
        }
        if (username) {
            const uuser = await User.findByIdAndUpdate(req.id, { username: username });
            await issuedItems.updateMany({ username: username });
            await issueReq.updateMany({ username: username });
            await submitReq.updateMany({ username: username });
            success = true;
            message = 'Account Updated';
        }
        if (email) {
            const uemail = await User.findByIdAndUpdate(req.id, { email: email });
            success = true;
            message = 'Account Updated';
        }
        if (mobile) {
            const umobile = await User.findByIdAndUpdate(req.id, { mobile: mobile });
            success = true;
            message = 'Account Updated';
        }
        if (opassword && npassword) {
            const isPasswordMatch = await bcrypt.compare(opassword, user.password);
            if (!isPasswordMatch) {
                return res.status(500).json({
                    message: 'old password is wrong'
                });
            }
            const hashedPassword = await bcrypt.hash(npassword, 10);
            const upassword = await User.findByIdAndUpdate(req.id, { password: hashedPassword });
            success = true;
            message = 'Account Updated';
        }
        if (!opassword && npassword) {
            const hashedPassword = await bcrypt.hash(npassword, 10);
            const upassword = await User.findByIdAndUpdate(req.id, { password: hashedPassword });
            success = true;
            message = 'Account Updated';
        }
    
        if (image) {
        const imageUrl = `${process.env.BACKEND_URL}/file/${req.file.originalname}`;
        const uimage = await User.findByIdAndUpdate(req.id, { image: imageUrl });
        success = true;
        message = 'Account Updated';
    }

    const updateduser = await User.findById(req.id);
    return res.status(200).json({
        success: success,
        message: message,
        updateduser
    })

} catch (error) {
    console.log("error while edit Profile", error);
}
}

export const sendMail = async (req, res) => {
    const { email, code } = req.params;
    //set nodemailer transport
    const transtporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kingkanhaiya57@gmail.com',
            pass: 'trvvqgskjviocabw'
        }
    });
    //body of mail
    const mailBody = {
        from: 'kingkanhaiya57@gmail.com',
        to: email,
        subject: 'Code For Update Account information',
        html: `<h1>${code}</h1>`,
    };
    try {
        let info = await transtporter.sendMail(mailBody);
        res.status(200).json({
            success: true,
            message: 'we send a code on your mail! please confirm'
        });
    } catch (error) {
        console.error('error sending mail:' + error);
        res.status(500).send("error sending mail:" + error.message);
    }
};