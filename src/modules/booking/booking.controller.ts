import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../app/utils/catchAsync";
import { sendResponse } from "../../app/utils/sendResponse";
import { BookingService } from "./booking.service";
import { FacilityModel } from "../facility/facility.model";
import { AppError } from "../../app/errors/AppError";




// create booking controller
const createBooking = catchAsync(async (req, res) => {
  const booking = req.body;
  //fetching price per hour
  const amount = await FacilityModel.findById(req.body.facility);
//   calculating time 
  const start = new Date(`1970-01-01T${booking.startTime}:00`);
  const end = new Date(`1970-01-01T${booking.endTime}:00`);
  
  const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  if (duration <= 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid time");
  }
  //calculating payableAmount
  booking.payableAmount = Number((amount?.pricePerHour as number) * duration);
  booking.isBooked = "confirmed";
  booking.user = req.user.id
  //sending booking data to service 
  const result = await BookingService.createBookingData(booking);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Booking created successfully",
    data: result,
  });
}); 
//get all booking controller
const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookingData();
  const isEmptyResult = !result || Object.keys(result).length === 0;
  sendResponse(res, {
    success:isEmptyResult ? false : true,
    statusCode: isEmptyResult ? StatusCodes.NOT_FOUND : StatusCodes.OK ,
    message:isEmptyResult ? "No data found" :"Bookings retrieved successfully",
    data: result,
  });
});
//get booking by user controller
const getBookingByUser = catchAsync(async (req, res) => {
 
  const result = await BookingService.getBookingDataByUser(req.user.id);
  const isEmptyResult = !result || Object.keys(result).length === 0;
  sendResponse(res, {
    success: isEmptyResult ? false :true,
    statusCode: isEmptyResult ? StatusCodes.NOT_FOUND : StatusCodes.OK ,
    message: isEmptyResult ? "No data found":"Bookings retrieved successfully",
    data: result,
  });
});
//cancel booking controller
const cancelBookingById = catchAsync(async (req, res) => {
  const result = await BookingService.cancelBookingDataById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Bookings cancelled successfully",
    data: result,
  });
});
export const BookingController = {
  getAllBooking,
  getBookingByUser,
  createBooking,
  cancelBookingById,
};
