import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validationRequest } from "../../app/middleware/validateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthLoginValidation } from "./auth.validation";

const router= Router()

router.post('/signup',validationRequest(UserValidation.createUserSchema),AuthController.userSignup)
router.post('/login',validationRequest(AuthLoginValidation.authLoginValidation),AuthController.userLogin)

export const AuthRoute = router