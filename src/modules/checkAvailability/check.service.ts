import { BookingModel } from "../booking/booking.model"

export const checkAvailabilityData = async()=>{

    const bookingsData = await BookingModel.find().select('date startTime endTime')
    
    // const newSchedule : Partial<TBooking> = {
    //     date,
    //     startTime,
    //     endTime
    // }

    // const result = await BookingModel.find()
    return {}
}