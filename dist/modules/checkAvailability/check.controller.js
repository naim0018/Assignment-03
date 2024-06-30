"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAvailability = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../app/utils/catchAsync");
const sendResponse_1 = require("../../app/utils/sendResponse");
const booking_model_1 = require("../booking/booking.model");
exports.checkAvailability = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //setting date variable
    const date = req.query.date ||
        `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`;
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
    const bookedSlot = yield booking_model_1.BookingModel.find({ date }).select("date startTime endTime isBooked");
    const canceledBooking = bookedSlot.filter((booking) => booking.isBooked !== "canceled");
    const availableSlot = timeSlot.filter((slot) => {
        return !canceledBooking.find((booked) => {
            return ((slot.startTime >= booked.startTime &&
                slot.startTime < booked.endTime) ||
                (slot.endTime > booked.startTime && slot.endTime <= booked.endTime));
        });
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Availability checked successfully",
        data: availableSlot,
    });
}));
