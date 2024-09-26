import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { USER_ROLES } from "../user/user.constant";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controllers";

const router = Router();

router.post(
    "/",
    auth(USER_ROLES.user),
    validateRequest(BookingValidation.createBookingValidationSchema),
    BookingController.createBooking
);
router.get(
    "/my-bookings",
    auth(USER_ROLES.user),
    BookingController.getUsersBooking
);
router.get("/", auth(USER_ROLES.admin), BookingController.getAllBookings);

export const BookingRoutes = router;