import express, { Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import { StatusCodes } from 'http-status-codes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { notFound } from './app/middleware/notFound'
const app = express()

app.use(express.json())
app.use(cors())


app.use('/api',router)

app.get('/',(req:Request,res:Response)=>{
    res.status(StatusCodes.OK).json({
        success:true,
        message:"Server connected",
        data:"Server Running"
    })
})

app.use(globalErrorHandler)
app.use(notFound)

export default app

