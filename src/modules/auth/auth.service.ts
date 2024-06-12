import { StatusCodes } from "http-status-codes"
import { AppError } from "../../app/errors/AppError"
import { TUser } from "../user/user.interface"
import { UserModel } from "../user/user.model"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from "../../app/config"

const userSignupData=async (payload:TUser)=>{
    const result = await UserModel.create(payload)
    return result 
}
const userLoginData=async (payload:TUser)=>{
    const isUserExist = await UserModel.findOne({email:payload.email})
    console.log(isUserExist)
    if(!isUserExist){
        throw new AppError(StatusCodes.NOT_FOUND,"User not found")
    }
     const isPasswordMatched =await bcrypt.compare(payload.password,isUserExist.password)
     console.log(isPasswordMatched)
     if(!isPasswordMatched){
        throw new AppError(StatusCodes.FORBIDDEN,"Password does not match")
     }

     const jwtPayload ={
        email:isUserExist.email,
        password:isUserExist.password
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

