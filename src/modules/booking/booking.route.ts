import { Router } from "express";
import { BookingController } from "./booking.controller";
import { validationRequest } from "../../app/middleware/validateRequest";
import { BookingValidation } from "./booking.validation";

const router = Router()

router.post('/',validationRequest(BookingValidation.bookingValidationSchema),BookingController.createBooking)
router.get('/',BookingController.getAllBooking)
router.get('/user',BookingController.getBookingByUser)

export const BookingRoute = router