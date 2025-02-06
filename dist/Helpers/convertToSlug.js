"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToSlug = void 0;
const slugify_1 = __importDefault(require("slugify"));
const remove_accents_1 = __importDefault(require("remove-accents"));
const convertToSlug = (text) => {
    const slug = (0, slugify_1.default)((0, remove_accents_1.default)(text), { lower: true, strict: true });
    return slug;
};
exports.convertToSlug = convertToSlug;
