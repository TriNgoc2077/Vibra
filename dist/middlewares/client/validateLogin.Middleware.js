"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = exports.validateLogin = void 0;
const validator_1 = __importDefault(require("validator"));
const validateLogin = (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            throw new Error('Email or Password does not exist !');
        }
        if (!validator_1.default.isEmail(req.body.email)) {
            throw new Error('Invalid email');
        }
        next();
    }
    catch (error) {
        req.flash('error', error.message);
        res.json({
            code: 400,
            message: error.message
        });
    }
};
exports.validateLogin = validateLogin;
const validateRegister = (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            throw new Error('Email or Password does not exist !');
        }
        if (!validator_1.default.isEmail(req.body.email)) {
            throw new Error('Invalid email');
        }
        if (req.body.password !== req.body.confirmPassword) {
            throw new Error('Password and Conform Password does not match !');
        }
        next();
    }
    catch (error) {
        req.flash('error', error.message);
        res.json({
            code: 400,
            message: error.message
        });
    }
};
exports.validateRegister = validateRegister;
