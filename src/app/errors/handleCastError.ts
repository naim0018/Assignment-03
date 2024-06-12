import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error.interface";

export const  handleCastError = (error:mongoose.Error.CastError):TGenericErrorResponse=>{

    const errorSources:TErrorSources =[{
        path:error.path,
        message:error.message
    }]

    return{
        statusCode : 400,
        message:"Invalid Id",
        errorSources
    }
}