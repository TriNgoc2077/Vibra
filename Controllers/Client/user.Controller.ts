import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../../Models/user.Model";
import { generateRandomNumber, generateRandomString } from "../../Helpers/generate";
import OTP from "../../Models/OTP.Model";
import { sendMail } from "../../Helpers/sendMail";
declare module 'express-session' {
    interface SessionData {
      userInfo?: {
        fullName: string,
        email: string,
        password: string,
        confirmPassword: string
      };
    }
  }
//[GET] /user/register
export const register = async (req: Request, res: Response) => {
	try {
		res.render("Client/Pages/User/register", {
			titlePage: "Register",
		});
	} catch (error) {
        console.log((error as Error).message); 
        res.redirect(req.get("Referrer") || "/");
	}
};
//[POST] /user/verify
export const verifyPost = async (req: Request, res: Response) => {
	try {
        const existEmail = await User.findOne({
			email: req.body.email,
			deleted: false,
		});
		if (existEmail) {
			req.flash("error", "Email already exist !");
			res.json({
                code: 400,
                message: 'Email already exist !'
            });
			return;
		}
		const data = req.body;
		//generate otp
		const otp = generateRandomNumber(6);
		const objectOTP = {
			email: data.email,
			otp: "",
			expireAt: Date.now(),
		};

		objectOTP.otp = otp;
		const request = new OTP(objectOTP);
		await request.save();
		//send mail
		const subject = "Your OTP";
		sendMail(data.email, subject, data, otp);
        req.session.userInfo = data;
        res.redirect('/user/verify');
	} catch (error) {
        console.log((error as Error).message); 
        res.redirect(req.get("Referrer") || "/");
	}
};
//[GET] /user/verify
export const verify = async (req: Request, res: Response) => {
    try {
        res.render("Client/Pages/User/verify", {
            titlePage: "Verify Email",
            data: req.session.userInfo
        });
    } catch(error) {
        console.log((error as Error).message); 
        req.flash('error', (error as Error).message);
        res.redirect(req.get("Referrer") || "/");
    }
}
//[POST] /user/registerpost
export const registerPost = async (req: Request, res: Response) => {
	try {
        // const data: { fullName?: string; email?: string; password?: string; confirmPassword?: string } = req.session.userInfo || {};
        const email = req.body.email;
		let otp = "";
		for (let i of [1, 2, 3, 4, 5, 6]) {
			const index = `otp${i}`;
			otp += req.body[index];
		}
		const request = await OTP.findOne({
			email: email,
			otp: otp,
		});

		if (!request) {
			req.flash("error", "OTP is invalid !");
			res.redirect(req.get("Referrer") || "/");
			return;
		} else {
			req.body.password = await bcrypt.hash(req.body.password, 12);
			req.body.userToken = generateRandomString(20);
			const user = new User(req.body);
			await user.save();
            //cookie
			res.cookie("userToken", req.body.userToken, {
                httpOnly: true,       // Do not allow JavaScript to access cookies
                path: '/', 
                secure: process.env.NODE_ENV === 'production', // Only send cookies over HTTPS in production environments
                sameSite: 'strict',   // Prevent cookies from being sent in cross-site requests
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in miliseconds
            });
              
			res.redirect("/topics");
		}
	} catch (error) {
        console.log((error as Error).message); 
        res.redirect(req.get("Referrer") || "/");
	}
};
//[GET] /user/login
export const login = async (req: Request, res: Response) => {
    try {
        res.render('Client/Pages/User/login', {
        pageTitle: 'Login' 
        });
    } catch(error) {
        console.log((error as Error).message); 
        res.redirect(req.get("Referrer") || "/");
    }
};
//[POST] /user/login
export const loginPost = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = await bcrypt.hash(req.body.password, 12);

        res.json({
            code: 200,
            message: 'Login successfully !'
        })
    } catch(error) {
        console.log((error as Error).message); 
        res.json({
            code: 400,
            message: (error as Error).message
        });
    }
};