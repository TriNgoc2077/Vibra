"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreate = void 0;
const validateCreate = (req, res, next) => {
    try {
        const properties = ['title', 'topicId', 'singerId', 'audio', 'description', 'status', 'avatar', 'lyrics'];
        const bodyKeys = Object.keys(req.body);
        const extraProps = bodyKeys.filter(key => !properties.includes(key));
        if (extraProps.length > 0) {
            req.flash('error', `Has redundant properties !`);
            return res.redirect(req.get("Referrer") || "/");
        }
        const missingProps = properties.slice(0, 4).filter(prop => !req.body[prop]);
        if (missingProps.length > 0) {
            req.flash('error', `Missing required properties`);
            return res.redirect(req.get("Referrer") || "/");
        }
        next();
    }
    catch (error) {
        req.flash('error', error.message);
        res.redirect(req.get("Referrer") || "/");
    }
};
exports.validateCreate = validateCreate;
