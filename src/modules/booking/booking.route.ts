import { Router } from "express";
import { BookingController } from "./booking.controller";
import { validationRequest } from "../../app/middleware/validateRequest";
import { BookingValidation } from "./booking.validation";
import { UserRole } from "../auth/auth.utils";
import auth from "../../app/middleware/auth";

const router = Router()

router.post('/',auth(UserRole.user),validationRequest(BookingValidation.bookingValidationSchema),BookingController.createBooking)
router.get('/',auth(UserRole.admin),BookingController.getAllBooking)
router.get('/user',auth(UserRole.user),BookingController.getBookingByUser)
router.get('/:id',auth(UserRole.user),BookingController.cancelBookingById)

export const BookingRoute = router 