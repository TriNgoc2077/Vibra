"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTimestamps = void 0;
const removeTimestamps = (lyrics) => {
    return lyrics.replace(/\[\d{2}:\d{2}\.\d{2}\]\s*/g, '');
};
exports.removeTimestamps = removeTimestamps;
