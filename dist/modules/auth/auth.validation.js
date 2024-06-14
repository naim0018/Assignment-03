"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginValidation = void 0;
const zod_1 = require("zod");
const authLoginValidation = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.AuthLoginValidation = {
    authLoginValidation
};
