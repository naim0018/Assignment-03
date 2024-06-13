import { Model } from "mongoose";

export interface TUser {
    name:string,
    email:string,
    password:string,
    phone:string,
    role:'admin'|'user',
    address:string
}

export interface UserModelData extends Model<TUser>{
    isUserExistByEmail(email:string):Promise<TUser>
}
