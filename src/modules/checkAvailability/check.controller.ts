import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../app/utils/catchAsync";

import { sendResponse } from "../../app/utils/sendResponse";

import { BookingModel } from "../booking/booking.model";

export const checkAvailability = catchAsync(async (req, res) => {
  //setting date variable
  const date =
    req.query.date ||
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(new Date().getDate()).padStart(2, "0")}`;
  
  //creating empty time slot
  const timeSlot = [];
  const startHour = 0;
  const endHour = 24;
  const interval = 2;
  //creating time slot
  for (let hour = startHour; hour < endHour; hour += interval) {
    const startTime = `${String(hour).padStart(2, "0")}:00`;
    const endTime = `${String(hour + interval).padStart(2, "0")}:00`;
    timeSlot.push({ startTime, endTime });
  }
  //fetching booking slot
  const bookedSlot = await BookingModel.find({ date }).select(
    "date startTime endTime isBooked"
  );
  const canceledBooking = bookedSlot.filter(
    (booking) => booking.isBooked !== "canceled"
  );

  const availableSlot = timeSlot.filter((slot) => {
    return !canceledBooking.find((booked) => {
      return (
        (slot.startTime >= booked.startTime &&
          slot.startTime < booked.endTime) ||
        (slot.endTime > booked.startTime && slot.endTime <= booked.endTime)
      );
    });
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Availability checked successfully",
    data: availableSlot,
  });
});
