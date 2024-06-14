import { z } from "zod";

//checking time formate
const timeStringSchema = z.string().refine(
    (time) => {
      const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
      return regex.test(time);
    },
    {
      message: 'Invalid time format , expected "HH:MM" in 24 hours format',
    },
  );
  
//creating booking validation
const createBookingValidationSchema = z.object({
    facility:z.string(),
    date:z.string(),
    startTime:timeStringSchema,
    endTime:timeStringSchema,

}).refine((data) => {
    const [startHour, startMinute] = data.startTime.split(':').map(Number);
    const [endHour, endMinute] = data.endTime.split(':').map(Number);

    const start = new Date(1970, 0, 1, startHour, startMinute);
    const end = new Date(1970, 0, 1, endHour, endMinute);

    return end > start;
  }, {
    message: 'End time must be after start time',
  });


export const BookingValidation ={
    createBookingValidationSchema 
}