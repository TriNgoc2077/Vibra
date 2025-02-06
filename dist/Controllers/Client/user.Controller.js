"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPost = exports.login = exports.registerPost = exports.verify = exports.verifyPost = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_Model_1 = __importDefault(require("../../Models/user.Model"));
const generate_1 = require("../../Helpers/generate");
const OTP_Model_1 = __importDefault(require("../../Models/OTP.Model"));
const sendMail_1 = require("../../Helpers/sendMail");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render("Client/Pages/User/register", {
            titlePage: "Register",
        });
    }
    catch (error) {
        console.log(error.message);
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.register = register;
const verifyPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existEmail = yield user_Model_1.default.findOne({
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
        const otp = (0, generate_1.generateRandomNumber)(6);
        const objectOTP = {
            email: data.email,
            otp: "",
            expireAt: Date.now(),
        };
        objectOTP.otp = otp;
        const request = new OTP_Model_1.default(objectOTP);
        yield request.save();
        const subject = "Your OTP";
        (0, sendMail_1.sendMail)(data.email, subject, data, otp);
        req.session.userInfo = data;
        res.redirect('/user/verify');
    }
    catch (error) {
        console.log(error.message);
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.verifyPost = verifyPost;
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render("Client/Pages/User/verify", {
            titlePage: "Verify Email",
            data: req.session.userInfo
        });
    }
    catch (error) {
        console.log(error.message);
        req.flash('error', error.message);
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.verify = verify;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        let otp = "";
        for (let i of [1, 2, 3, 4, 5, 6]) {
            const index = `otp${i}`;
            otp += req.body[index];
        }
        const request = yield OTP_Model_1.default.findOne({
            email: email,
            otp: otp,
        });
        if (!request) {
            req.flash("error", "OTP is invalid !");
            res.redirect(req.get("Referrer") || "/");
            return;
        }
        else {
            req.body.password = yield bcrypt_1.default.hash(req.body.password, 12);
            req.body.userToken = (0, generate_1.generateRandomString)(20);
            const user = new user_Model_1.default(req.body);
            yield user.save();
            res.cookie("userToken", req.body.userToken, {
                httpOnly: true,
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.redirect("/topics");
        }
    }
    catch (error) {
        console.log(error.message);
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.registerPost = registerPost;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('Client/Pages/User/login', {
            pageTitle: 'Login'
        });
    }
    catch (error) {
        console.log(error.message);
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = yield bcrypt_1.default.hash(req.body.password, 12);
        res.json({
            code: 200,
            message: 'Login successfully !'
        });
    }
    catch (error) {
        console.log(error.message);
        res.json({
            code: 400,
            message: error.message
        });
    }
});
exports.loginPost = loginPost;
