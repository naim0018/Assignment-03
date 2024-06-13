import { BookingModel } from "./booking.model";

//get all booking data service
const getAllBookingData = async () => {
  const result = await BookingModel.find();
  return result;
};
// get booking data by user service
const getBookingDataByUser = async (id: string) => {
  console.log(id)
  const result = await BookingModel.findOne({user : id }).populate('facility');
  console.log('result', result)
  return result;
};
//create booking data service
const createBookingData = async (payload: string) => {
  const result = await BookingModel.create(payload);
  return result;
};
//cancel booking data by id service
const cancelBookingDataById = async (id: string) => {
  const result = await BookingModel.findOneAndUpdate(
    { _id: id },
    { isBooked: "canceled" },
    { new: true }
  ).populate('facility');
  return result;
};

export const BookingService = {
  getAllBookingData,
  getBookingDataByUser,
  createBookingData,
  cancelBookingDataById,
};
