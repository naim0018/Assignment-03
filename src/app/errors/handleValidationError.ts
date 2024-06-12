import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error.interface";

const handleValidationError =(error:mongoose.Error.ValidationError):TGenericErrorResponse=>{
    const errorSources :TErrorSources = Object.values(error.errors).map((value:mongoose.Error.ValidatorError | mongoose.Error.CastError)=>{
        return{
            path:value.path,
            message:value.message
        }
    })
    return {
        statusCode:400,
        message:"Validation Error",
        errorSources
    }
}