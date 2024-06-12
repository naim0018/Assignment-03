import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../app/utils/catchAsync";
import { sendResponse } from "../../app/utils/sendResponse";
import { BookingService } from "./booking.service";
import { FacilityModel } from "../facility/facility.model";
import { AppError } from "../../app/errors/AppError";



const getAllBooking= catchAsync(async(req,res)=>{
    const result = await BookingService.getAllBookingData()
    sendResponse(res,{
       statusCode:StatusCodes.OK,
       success:true,
       message:"Bookings retrieved successfully",
       data:result
    })
})
const getBookingByUser= catchAsync(async(req,res)=>{
    const result = await BookingService.getBookingDataByUser(req.params.user)
    sendResponse(res,{
       statusCode:StatusCodes.OK,
       success:true,
       message:"Bookings retrieved successfully",
       data:result
    })
})
const cancelBookingById= catchAsync(async(req,res)=>{
    const result = await BookingService.cancelBookingDataById(req.params.id)
    sendResponse(res,{
       statusCode:StatusCodes.OK,
       success:true,
       message:"Bookings retrieved successfully",
       data:result
    })
})
const createBooking= catchAsync(async(req,res)=>{
    let {isBooked,startTime,endTime,payableAmount} = req.body

    const amount = await FacilityModel.findById(req.body.facility)

    console.log(amount?.pricePerHour)
    const start = new Date (`1970-01-01T${startTime}:00`)
    const end = new Date (`1970-01-01T${endTime}:00`)
    const duration = (end.getTime() - start.getTime()) / (1000*60*60)
    if(duration<=0){
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid time");
    }


    isBooked = 'confirmed'
    payableAmount = amount?.pricePerHour as number * duration


    const result = await BookingService.createBookingData(req.body)
    sendResponse(res,{
       statusCode:StatusCodes.OK,
       success:true,
       message:"Bookings created successfully",
       data:result
    })
})

export const BookingController ={
    getAllBooking,
    getBookingByUser,
    createBooking,
    cancelBookingById

}