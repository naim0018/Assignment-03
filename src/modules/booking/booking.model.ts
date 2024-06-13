import { Schema, SchemaType, model } from "mongoose";
import { TBooking } from "./booking.interface";


const bookingSchema = new Schema<TBooking>({
    facility:{
        type:Schema.Types.ObjectId,
        ref:'Facility',
        required:[true,"Facility is required"]
    },
    date:{
        type:String,
        required:[true,"Date is required"]
    },
    startTime:{
        type:String,
        required:[true,"Start time is required"]
    },
    endTime:{
        type:String,
        required:[true,"End time is required"]
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User is required"]
    },
    payableAmount:{
        type:Number,
        required: [true, "Payable amount is required"]
        
    },
    isBooked:{
        type:String,
        enum:['confirmed','unconfirmed','canceled'],
        required: [true, "isBooked is required"]
       
    },
})

bookingSchema.pre('save',async function(){
    const isBookingExist = await BookingModel.find({isBooked:'cancelled'})

})



export const BookingModel = model<TBooking>('Booking',bookingSchema)