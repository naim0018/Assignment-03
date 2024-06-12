import { StatusCodes } from "http-status-codes"
import { catchAsync } from "../../app/utils/catchAsync"
import { sendResponse } from "../../app/utils/sendResponse"
import { TUser } from "../user/user.interface"
import { AuthService } from "./auth.service"


const userSignup=catchAsync(async(req,res)=>{
    
    
    console.log(req.body)
    const result = await AuthService.userSignupData(req.body)
    sendResponse(res,{
        success:true,
        status:StatusCodes.OK,
        message:"User registered successfully",
        data:result
    })

})
const userLogin=catchAsync(async(req,res)=>{
 
    const result = await AuthService.userLoginData(req.body)
    const {token,isUserExist} = result
    sendResponse(res,{
        success:true,
        status:StatusCodes.OK,
        message:"User logged in successfully",
        token:token,
        data:isUserExist
    })

})

export const AuthController = {
    userSignup,
    userLogin
}