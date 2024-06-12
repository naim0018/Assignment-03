import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";


const UserSchema = new Schema<TUser>({
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
        required:[true,"Password is required"]
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
})


export const UserModel = model<TUser>('User',UserSchema)