import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../app/utils/catchAsync";
// import { checkAvailabilityData } from "./check.service";
import { sendResponse } from "../../app/utils/sendResponse";


export const checkAvailability = catchAsync(async(req,res)=>{
    console.log(req.query)
    // const result = await checkAvailabilityData(req.query)

    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"Availability checked successfully",
        data:result
    })
})
