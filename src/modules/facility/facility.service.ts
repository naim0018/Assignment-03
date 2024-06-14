import { StatusCodes } from "http-status-codes"
import { AppError } from "../../app/errors/AppError"
import { TFacility } from "./facility.interface"
import { FacilityModel } from "./facility.model"

//get all facility from db
const getAllFacilityData = async()=>{
    const result = await FacilityModel.find()
    return result 
}
//create facility to db
const createFacilityData = async(payload:TFacility)=>{
    const result = await FacilityModel.create(payload)
    return result 
}
//update facility from bd using id
const updateFacilityData = async(id:string,payload:TFacility)=>{

    const isFacilityExist = await FacilityModel.findOne({_id:id})
    if(!isFacilityExist){
        throw new AppError(StatusCodes.NOT_FOUND,"Facility not found")
    }

    const result = await FacilityModel.findOneAndUpdate({_id:id},payload,{new:true})
  
    return result 
}
//deleting facility data from db
const deleteFacilityData = async(id:string)=>{
    const result = await FacilityModel.findOneAndUpdate({_id:id},{isDeleted:true},{new:true})
    return result 
}

export const FacilityService = {
    getAllFacilityData,
    createFacilityData,
    updateFacilityData,
    deleteFacilityData,
}