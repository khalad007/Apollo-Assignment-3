import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { BookingValidation } from './booking.validation';
import { BookingController } from './booking.controller';
import { CarControllers } from '../car/car.controller';
import { CarValidation } from '../car/car.validation';

const router = express.Router();

router.post(
  '/',
  auth('user', 'admin'),
  validateRequest(BookingValidation.BookingValidationSchema),
  BookingController.CreateBooking,
);
router.get('/my-bookings', 
  auth('user'), 
BookingController.GetMyBooking);
router.get('/', 
  auth('admin'), 
  BookingController.GetAllBookings);
// router.get('/', CarControllers.GetCar);

// router.get('/:id',CarControllers.GetCarById)
// router.delete('/:id',CarControllers.DeleteCar)
// router.put('/:id',auth("admin"),validateRequest(CarValidation.UpdateCarValidationSchema),CarControllers.UpdateCar)

export const BookingRoutes = router;
