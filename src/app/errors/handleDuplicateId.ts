import { TErrorSources, TGenericErrorResponse } from "../interface/error.interface";


export const handleDuplicateId = (error:any):TGenericErrorResponse=>{
const match= error.message.match(/"([^"]*)"/)
const extractedValue = match && match[1]
const errorSources :TErrorSources = [
    {
        path:"",
        message:extractedValue
    }
]
    return {
        statusCode:11000,
        message:extractedValue,
        errorSources
    }
}