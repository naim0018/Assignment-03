import { Schema, SchemaType, model } from "mongoose";
import { TBooking } from "./booking.interface";


const bookingSchema = new Schema<TBooking>({
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
        type:String,
        required:[true,"User is required"]
    },
    facility:{
        type:Schema.Types.ObjectId,
        ref:'Facility'
    },
    payableAmount:{
        type:Number,
        required:[true,"Payable amount is required"]
    },
    isBooked:{
        type:String,
        enum:['confirmed','unconfirmed','canceled'],
        required:[true,"isBooked is required"]
    },
},{
    timestamps:true
})

export const BookingModel = model<TBooking>('Booking',bookingSchema)