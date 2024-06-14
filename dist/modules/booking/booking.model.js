"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    facility: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Facility',
        required: [true, "Facility is required"]
    },
    date: {
        type: String,
        required: [true, "Date is required"]
    },
    startTime: {
        type: String,
        required: [true, "Start time is required"]
    },
    endTime: {
        type: String,
        required: [true, "End time is required"]
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    payableAmount: {
        type: Number,
        required: [true, "Payable amount is required"]
    },
    isBooked: {
        type: String,
        enum: ['confirmed', 'unconfirmed', 'canceled'],
        required: [true, "isBooked is required"]
    },
});
//booking model
exports.BookingModel = (0, mongoose_1.model)('Booking', bookingSchema);
