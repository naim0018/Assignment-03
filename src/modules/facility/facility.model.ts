import { Schema, model } from "mongoose";
import { TFacility } from "./facility.interface";

const facilitySchema = new Schema<TFacility>({
    name:{
        type:String,
        required:[true,"Name is Required"]
    },
    description:{
        type:String,
        required:[true,"Description is Required"]
    },
    pricePerHour:{
        type:Number,
        required:[true,"PricePerHour is Required"]
    },
    location:{
        type:String,
        required:[true,"Location is Required"]
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
},{
    versionKey: false
})

export const FacilityModel = model<TFacility>('Facility',facilitySchema)