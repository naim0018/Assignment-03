import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../app/utils/catchAsync";
import { sendResponse } from "../../app/utils/sendResponse";
import { UserService } from "./user.service";

const getAllUser = catchAsync(async(req,res)=>{
    const result = await UserService.getAllUserData()
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"All user retrieved successfully",
        data:result
    })
})


export const UserController = {
    getAllUser
}