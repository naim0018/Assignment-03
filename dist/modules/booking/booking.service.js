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
exports.BookingService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../app/errors/AppError");
const booking_model_1 = require("./booking.model");
//create booking data service
const createBookingData = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, startTime, endTime } = payload;
    const existingTime = yield booking_model_1.BookingModel.find({ date }).select("date startTime endTime");
    const newTime = {
        date,
        startTime,
        endTime,
    };
    existingTime.forEach((time) => {
        const existingStartTime = new Date(`1970-01-01T${time.startTime}`);
        const existingEndTime = new Date(`1970-01-01T${time.endTime}`);
        const newStartTime = new Date(`1970-01-01T${newTime.startTime}`);
        const newEndTime = new Date(`1970-01-01T${newTime.endTime}`);
        if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "Time conflict");
        }
    });
    const result = yield booking_model_1.BookingModel.create(payload);
    return result;
});
//get all booking data service
const getAllBookingData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.BookingModel.find({ isBooked: { $ne: 'canceled' } }).populate("facility").populate("user");
    return result;
});
// get booking data by user service
const getBookingDataByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.BookingModel.findOne({ user: id }).populate("facility");
    return result;
});
//cancel booking data by id service
const cancelBookingDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.BookingModel.findOneAndUpdate({ _id: id }, { isBooked: "canceled" }, { new: true }).populate("facility");
    return result;
});
exports.BookingService = {
    getAllBookingData,
    getBookingDataByUser,
    createBookingData,
    cancelBookingDataById,
};
