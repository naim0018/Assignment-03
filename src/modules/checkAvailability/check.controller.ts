import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../app/utils/catchAsync";
import { checkAvailabilityData } from "./check.service";
import { sendResponse } from "../../app/utils/sendResponse";
import { TBooking } from "../booking/booking.interface";


export const checkAvailability = catchAsync(async(req,res)=>{
    console.log(req.query)
    const date = req.query.date || new Date()
   



    const result = await checkAvailabilityData()

    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"Availability checked successfully",
        data:result
    })
})
