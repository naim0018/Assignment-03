"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = require("../../app/middleware/validateRequest");
const user_validation_1 = require("../user/user.validation");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
// signup admin or user route
router.post('/signup', (0, validateRequest_1.validationRequest)(user_validation_1.UserValidation.createUserSchema), auth_controller_1.AuthController.userSignup);
// login admin or user route
router.post('/login', (0, validateRequest_1.validationRequest)(auth_validation_1.AuthLoginValidation.authLoginValidation), auth_controller_1.AuthController.userLogin);
exports.AuthRoute = router;
