import { StatusCodes } from "http-status-codes"
import { catchAsync } from "../../app/utils/catchAsync"
import { sendResponse } from "../../app/utils/sendResponse"
import { FacilityService } from "./facility.service"
import { AppError } from "../../app/errors/AppError"

const getAllFacility=catchAsync(async(req,res)=>{
    const result= await FacilityService.getAllFacilityData()
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"Facilities retrieved successfully",
        data:result
    })
})
const createFacility=catchAsync(async(req,res)=>{
    const result= await FacilityService.createFacilityData(req.body)
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"Facility added successfully",
        data:result
    })
})
const updateFacility=catchAsync(async(req,res)=>{
    const result= await FacilityService.updateFacilityData(req.params.id,req.body)
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"Facility updated successfully",
        data:result
    })
})
const deleteFacility=catchAsync(async(req,res)=>{
    const result= await FacilityService.deleteFacilityData(req.params.id)
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"Facility deleted successfully",
        data:result
    })
})

export const FacilityController = {
    getAllFacility,
    createFacility,
    updateFacility,
    deleteFacility,
}