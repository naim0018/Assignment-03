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

//removing the deleted data
facilitySchema.pre('find',function(next){
    this.find({isDeleted : {$ne:true}})
      next()   
})
//removing deleted data on findOne
facilitySchema.pre('findOne',function(next){
    this.find({isDeleted: {$ne:true}})
      next()   
})
//removing deleted data from findOneAndUpdate operation
facilitySchema.pre('findOneAndUpdate',function(next){
    this.find({isDeleted: {$ne:true}})
      next()   
})

//facilityModel
export const FacilityModel = model<TFacility>('Facility',facilitySchema)