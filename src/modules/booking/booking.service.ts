import { BookingModel } from "./booking.model"

const getAllBookingData = async()=>{
    const result = await BookingModel.find()
    return result 
}
    
const getBookingDataByUser = async(user:string)=>{
    const result = await BookingModel.findOne({_id:user})
    return result 
}
const createBookingData = async(payload:string)=>{
    const result = await BookingModel.create(payload)
    return result 
}
const cancelBookingDataById = async(id:string)=>{
    const result = await BookingModel.findOneAndUpdate({_id:id},{isBooked:"canceled"},{new:true})
    return result 
}
export const BookingService = {
    getAllBookingData,
    getBookingDataByUser,
    createBookingData,
    cancelBookingDataById,
}