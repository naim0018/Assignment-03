"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone is required"]
    },
    role: {
        type: String,
        required: [true, "Role is required"]
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    }
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
