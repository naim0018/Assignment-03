"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
//user validation
const createUserSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Name is required"),
    email: zod_1.z.string().email("Invalid email format").nonempty("Email is required"),
    password: zod_1.z.string().nonempty("Password is required"),
    phone: zod_1.z.string().nonempty("Phone is required"),
    role: zod_1.z.string().nonempty("Role is required"),
    address: zod_1.z.string().nonempty("Address is required"),
});
exports.UserValidation = {
    createUserSchema
};
