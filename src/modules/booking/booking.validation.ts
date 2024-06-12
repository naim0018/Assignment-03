import { ZodSchema, z } from "zod";

const bookingValidationSchema = z.object({
    facility:z.string(),
    date:z.string(),
    startTime:z.string(),
    endTime:z.string(),

})

export const BookingValidation ={
    bookingValidationSchema
}