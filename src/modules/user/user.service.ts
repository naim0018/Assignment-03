import { UserModel } from "./user.model"

const getAllUserData = async()=>{
    const result = await UserModel.find()
    return result 
}

export const UserService = {
    getAllUserData
}