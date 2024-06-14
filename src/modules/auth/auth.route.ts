import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validationRequest } from "../../app/middleware/validateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthLoginValidation } from "./auth.validation";

const router= Router()
// signup admin or user route
router.post('/signup',validationRequest(UserValidation.createUserSchema),AuthController.userSignup)
// login admin or user route
router.post('/login',validationRequest(AuthLoginValidation.authLoginValidation),AuthController.userLogin)

export const AuthRoute = router