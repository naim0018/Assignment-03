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
exports.BookingController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../app/utils/catchAsync");
const sendResponse_1 = require("../../app/utils/sendResponse");
const booking_service_1 = require("./booking.service");
const facility_model_1 = require("../facility/facility.model");
const AppError_1 = require("../../app/errors/AppError");
// create booking controller
const createBooking = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = req.body;
    //fetching price per hour
    const amount = yield facility_model_1.FacilityModel.findById(req.body.facility);
    //   calculating time 
    const start = new Date(`1970-01-01T${booking.startTime}:00`);
    const end = new Date(`1970-01-01T${booking.endTime}:00`);
    console.log(start, end);
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if (duration <= 0) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid time");
    }
    //calculating payableAmount
    booking.payableAmount = Number((amount === null || amount === void 0 ? void 0 : amount.pricePerHour) * duration);
    booking.isBooked = "confirmed";
    booking.user = req.user.id;
    //sending booking data to service 
    const result = yield booking_service_1.BookingService.createBookingData(booking);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Booking created successfully",
        data: result,
    });
}));
//get all booking controller
const getAllBooking = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.getAllBookingData();
    const isEmptyResult = !result || Object.keys(result).length === 0;
    (0, sendResponse_1.sendResponse)(res, {
        success: isEmptyResult ? false : true,
        statusCode: isEmptyResult ? http_status_codes_1.StatusCodes.NOT_FOUND : http_status_codes_1.StatusCodes.OK,
        message: isEmptyResult ? "No data found" : "Bookings retrieved successfully",
        data: result,
    });
}));
//get booking by user controller
const getBookingByUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.getBookingDataByUser(req.user.id);
    const isEmptyResult = !result || Object.keys(result).length === 0;
    (0, sendResponse_1.sendResponse)(res, {
        success: isEmptyResult ? false : true,
        statusCode: isEmptyResult ? http_status_codes_1.StatusCodes.NOT_FOUND : http_status_codes_1.StatusCodes.OK,
        message: isEmptyResult ? "No data found" : "Bookings retrieved successfully",
        data: result,
    });
}));
//cancel booking controller
const cancelBookingById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.cancelBookingDataById(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Bookings cancelled successfully",
        data: result,
    });
}));
exports.BookingController = {
    getAllBooking,
    getBookingByUser,
    createBooking,
    cancelBookingById,
};
