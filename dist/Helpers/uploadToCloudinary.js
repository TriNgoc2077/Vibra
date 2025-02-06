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
exports.streamUpload = void 0;
exports.uploadToCloudinary = uploadToCloudinary;
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});
let streamUpload = (fileBuffer, resourceType = "auto") => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream({ resource_type: resourceType }, (error, result) => {
            if (result) {
                resolve(result.secure_url);
            }
            else {
                reject(error);
            }
        });
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};
exports.streamUpload = streamUpload;
function uploadToCloudinary(req) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.file) {
            const result = yield (0, exports.streamUpload)(req.file.buffer);
            req.body[req.file.fieldname] = result;
        }
    });
}
