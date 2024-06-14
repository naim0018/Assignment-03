import { StatusCodes } from "http-status-codes"
import { catchAsync } from "../../app/utils/catchAsync"
import { sendResponse } from "../../app/utils/sendResponse"
import { FacilityService } from "./facility.service"
import { AppError } from "../../app/errors/AppError"

//get all facility
const getAllFacility=catchAsync(async(req,res)=>{
    const result= await FacilityService.getAllFacilityData()

    const isEmptyResult = !result || Object.keys(result).length === 0;

    sendResponse(res,{
        success:isEmptyResult ? false : true,
        statusCode:isEmptyResult ? StatusCodes.NOT_FOUND : StatusCodes.OK,
        message:isEmptyResult ? "No data found" :"Facilities retrieved successfully",
        data:result
    })
})
//create facility
const createFacility=catchAsync(async(req,res)=>{
    const result= await FacilityService.createFacilityData(req.body)
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"Facility added successfully",
        data:result
    })
})
//update facility
const updateFacility=catchAsync(async(req,res)=>{
    const result= await FacilityService.updateFacilityData(req.params.id,req.body)
    const isEmptyResult = !result || Object.keys(result).length === 0;
    sendResponse(res,{
        success:isEmptyResult ? false : true,
        statusCode:isEmptyResult ? StatusCodes.NOT_FOUND :StatusCodes.OK,
        message:isEmptyResult ? "No data found" :"Facility updated successfully",
        data:result
    })
})
const deleteFacility=catchAsync(async(req,res)=>{
    const result= await FacilityService.deleteFacilityData(req.params.id)
    const isEmptyResult = !result || Object.keys(result).length === 0;
    sendResponse(res,{
        success:isEmptyResult ? false : true,
        statusCode: isEmptyResult ? StatusCodes.NOT_FOUND :StatusCodes.OK,
        message:isEmptyResult ? "No data found" :"Facility deleted successfully",
        data:result
    })
})

export const FacilityController = {
    getAllFacility,
    createFacility,
    updateFacility,
    deleteFacility,
}