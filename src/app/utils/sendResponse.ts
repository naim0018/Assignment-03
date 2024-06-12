import { Response } from "express";

type TResponse <T> ={
    status:number,
    success:boolean,
    message:string,
    token?:string,
    data: T
    
}

export const sendResponse =<T>(res:Response,data:TResponse<T>)=>{
    res.status(data.status).json({
        success:data.success,
        statusCode:data.status,
        message:data.message,
        token:data.token,
        data:data.data
    })
}