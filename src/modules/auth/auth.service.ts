import { StatusCodes } from "http-status-codes"
import { AppError } from "../../app/errors/AppError"
import { TUser } from "../user/user.interface"
import { UserModel } from "../user/user.model"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from "../../app/config"

//Create User or Admin
const userSignupData=async (payload:TUser)=>{
    const result = await UserModel.create(payload)
    return result 
}

//Login User or Admin
const userLoginData=async (payload:TUser)=>{
    const isUserExist = await UserModel.findOne({email:payload.email}).select('+password')
    if(!isUserExist){
        throw new AppError(StatusCodes.NOT_FOUND,"User not found")
    }
    
     const isPasswordMatched =await bcrypt.compare(payload.password,isUserExist.password)
     if(!isPasswordMatched){
        throw new AppError(StatusCodes.FORBIDDEN,"Password does not match")
     }

     const jwtPayload ={
        id:isUserExist._id,
        email:isUserExist.email,
        password:isUserExist.password,
        role:isUserExist.role
     }
    //  create jwt token
    const token = jwt.sign(jwtPayload,config.jwt_access_secret as string ,{expiresIn:'10d'})
    return {
        token,
        isUserExist
    }
}

export const AuthService ={
    userSignupData,
    userLoginData
}

