import { Model } from "mongoose";
//user interface
export interface TUser {
    name:string,
    email:string,
    password:string,
    phone:string,
    role:'admin'|'user',
    address:string
}
//creating UserModelData interface
export interface UserModelData extends Model<TUser>{
    isUserExistByEmail(email:string):Promise<TUser>
}
