import { TFacility } from "./facility.interface"
import { FacilityModel } from "./facility.model"

const getAllFacilityData = async()=>{
    const result = await FacilityModel.find()
    return result 
}
const createFacilityData = async(payload:TFacility)=>{
    const result = await FacilityModel.create(payload)
    return result 
}
const updateFacilityData = async(id:string,payload:TFacility)=>{
    const result = await FacilityModel.findOneAndUpdate({_id:id},payload,{new:true})
    return result 
}
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