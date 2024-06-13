import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../app/utils/catchAsync";
import { sendResponse } from "../../app/utils/sendResponse";
import { BookingService } from "./booking.service";
import { FacilityModel } from "../facility/facility.model";
import { AppError } from "../../app/errors/AppError";
import { TBooking } from "./booking.interface";



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
    statusCode: StatusCodes.OK,
    success: true,
    message: "Bookings created successfully",
    data: result,
  });
}); 
//get all booking controller
const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookingData();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});
//get booking by user controller
const getBookingByUser = catchAsync(async (req, res) => {
  const result = await BookingService.getBookingDataByUser(req.user.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});
//cancel booking controller
const cancelBookingById = catchAsync(async (req, res) => {
  const result = await BookingService.cancelBookingDataById(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
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
