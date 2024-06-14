import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";

//get all booking data service
const getAllBookingData = async () => {
  const result = await BookingModel.find().populate("facility").populate("user");
 
  return result;
};
// get booking data by user service
const getBookingDataByUser = async (id: string) => {
  
  const result = await BookingModel.findOne({ user: id }).populate("facility");
  return result;
};
//create booking data service
const createBookingData = async (payload: TBooking) => {
  const { date, startTime, endTime } = payload;

  const existingTime = await BookingModel.find({date}).select(
    "date startTime endTime"
  );
  const newTime = {
    date,
    startTime,
    endTime,
  };
  existingTime.forEach((time)=>{
    const existingStartTime = new Date(`1970-01-01T${time.startTime}`)
    const existingEndTime = new Date(`1970-01-01T${time.endTime}`)
    const newStartTime = new Date(`1970-01-01T${newTime.startTime}`)
    const newEndTime = new Date(`1970-01-01T${newTime.endTime}`)

    if(newStartTime < existingEndTime && newEndTime > existingStartTime){
      throw new AppError(StatusCodes.CONFLICT,"Time conflict")
    }

  })

  const result = await BookingModel.create(payload);
  return result;

};
//cancel booking data by id service
const cancelBookingDataById = async (id: string) => {
  const result = await BookingModel.findOneAndUpdate(
    { _id: id },
    { isBooked: "canceled" },
    { new: true }
  ).populate("facility");
  return result;
};

export const BookingService = {
  getAllBookingData,
  getBookingDataByUser,
  createBookingData,
  cancelBookingDataById,
};
