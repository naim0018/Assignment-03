import { UserRole } from "./auth.utils"

export type TAuthLogin = {
    email:string,
    password:string
}

export type TUserRole = keyof typeof UserRole