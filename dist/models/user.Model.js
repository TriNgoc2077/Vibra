"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: String,
    email: String,
    password: String,
    userToken: {
        type: String,
    },
    favoriteSongs: Array,
    likeSongs: Array,
    phone: String,
    address: String,
    birthday: String,
    bio: String,
    avatar: String,
    status: {
        type: String,
        default: "active"
    },
    deletedAt: Date,
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});
const User = mongoose_1.default.model('User', userSchema, "users");
exports.default = User;
