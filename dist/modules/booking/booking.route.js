"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoute = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const validateRequest_1 = require("../../app/middleware/validateRequest");
const booking_validation_1 = require("./booking.validation");
const auth_utils_1 = require("../auth/auth.utils");
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(auth_utils_1.UserRole.user), (0, validateRequest_1.validationRequest)(booking_validation_1.BookingValidation.createBookingValidationSchema), booking_controller_1.BookingController.createBooking);
router.get('/', (0, auth_1.default)(auth_utils_1.UserRole.admin), booking_controller_1.BookingController.getAllBooking);
router.get('/user', (0, auth_1.default)(auth_utils_1.UserRole.user), booking_controller_1.BookingController.getBookingByUser);
router.delete('/:id', (0, auth_1.default)(auth_utils_1.UserRole.user), booking_controller_1.BookingController.cancelBookingById);
exports.BookingRoute = router;
