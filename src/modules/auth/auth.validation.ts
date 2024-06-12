import { z } from "zod";

const authLoginValidation = z.object({
    email:z.string(),
    password:z.string()
})

export const AuthLoginValidation ={
    authLoginValidation
}