import { ZodSchema, z } from "zod";

const createBookingValidationSchema = z.object({
    facility:z.string(),
    date:z.string(),
    startTime:z.string().refine((time)=>{
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
        return regex.test(time)
    },{
        message:'Invalid time format'
    }),
    endTime:z.string().refine((time)=>{
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
        return regex.test(time)
    },{
        message:'Invalid time format'
    }),

}).refine((time)=>{
    console.log(time.startTime)
    console.log(time.endTime)

    const start = new Date (`1970-01-01TT${time.startTime}:00`)
    const end = new Date (`1970-01-01TT${time.endTime}:00`)
    return end>start
},{
    message:'Start time should be before end time'
})

export const BookingValidation ={
    createBookingValidationSchema
}