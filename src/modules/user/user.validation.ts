import { z } from "zod";

const createUserSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
    phone: z.string().nonempty("Phone is required"),
    role: z.string().nonempty("Role is required"),
    address: z.string().nonempty("Address is required"),
  });

export const UserValidation ={
    createUserSchema
}