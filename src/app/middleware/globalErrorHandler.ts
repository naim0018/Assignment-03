import {ErrorRequestHandler } from 'express'
import { TErrorSources } from '../interface/error.interface'
import { ZodError } from 'zod'
import { handleZodError } from '../errors/handleZodError'
import { handleValidationError } from '../errors/handleValidationError'
import { handleDuplicateId } from '../errors/handleDuplicateId'
import { AppError } from '../errors/AppError'

const globalErrorHandler:ErrorRequestHandler  =(err,req,res,next)=>{
    let statusCode = err.statusCode || 500
    let message = err.message || 'Something went wrong'

 
    let errorSources :TErrorSources = [{
        path: '',
        message: message
    }]

    if(err instanceof ZodError){
        const error = handleZodError(err)
        statusCode = error?.statusCode,
        message = error?.message,
        errorSources = error?.errorSources
    }else if(err.name === 'ValidationError'){
        const error = handleValidationError(err)
        statusCode = error?.statusCode,
        message = error?.message,
        errorSources = error?.errorSources
    }else if(err.code ===11000){
        const error = handleDuplicateId(err)
        statusCode = error?.statusCode,
        message = error?.message,
        errorSources = error?.errorSources
    }else if(err instanceof AppError){
        statusCode = err?.statusCode,
        message = err?.message,
        errorSources =[ {
            path:'',
          message:  err?.message
        }]
    }


    return res.status(statusCode).json({
        success:false,
        message,
        errorSources
    })
}

export default globalErrorHandler