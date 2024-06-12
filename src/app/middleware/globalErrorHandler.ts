import {ErrorRequestHandler } from 'express'
import { TErrorSources } from '../interface/error.interface'

const globalErrorHandler:ErrorRequestHandler  =(err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Something went wrong'

 
    const errorSources :TErrorSources = [{
        path: '',
        message: ''
    }]

    return res.status(statusCode).json({
        success:false,
        message,
        errorSources
    })
}

export default globalErrorHandler