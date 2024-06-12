import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../app/config";
import bcrypt from 'bcrypt'


const userSchema = new Schema<TUser>({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        select:0
    },
    phone:{
        type:String,
        required:[true,"Phone is required"]
    },
    role:{
        type:String,
        required:[true,"Role is required"]
    },
    address:{
        type:String,
        required:[true,"Address is required"]
    }
},{
    timestamps:true
})

userSchema.pre('save',async function(next){
    const user = this
    user.password  = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    )
    next()
})

export const UserModel = model<TUser>('User',userSchema)