import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { TBooking, TBookingData } from './booking.interface';
import { BookingModel } from './booking.model';
import { CarModel } from '../car/car.model';

const CreateBookingIntoDb = async (
  payload: Partial<TBookingData>,
  userId: string,
) => {
  const { carId, ...OtherData } = payload;
  const data = { ...OtherData, user: userId, car: carId };
  const findCar = await CarModel.findById(carId);
  // @ts-ignore
  if (!findCar || findCar.status == 'unavailable') {
    throw new AppError(httpStatus.NOT_FOUND, 'This car is not available');
  }
  const result = await BookingModel.create(data);
  const UpdateCar = await CarModel.findByIdAndUpdate(carId, {
    status: 'unavailable',
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_IMPLEMENTED, "Couldn't done the booking");
  }

  console.log(result);
  const findBooking = await BookingModel.findById(result._id)
    .populate('user')
    .populate('car');

  return findBooking;
};
const GetMyBookingFromDb = async (userId: string) => {
  const result = await BookingModel.find({ user: userId })
    .populate('user')
    .populate('car');
  return result;
};

const GetAllBookingsFromDb = async (params: any) => {
  const { carId, date } = params;
  console.log(params);
  const findObj: any = {};
  if (carId) {
    findObj['car'] = carId;
  }
  if (date) {
    findObj['date'] = date;
  }
  const result = await BookingModel.find(findObj)
    .populate('user')
    .populate('car');
  return result;
};

export const BookingServices = {
  CreateBookingIntoDb,
  GetMyBookingFromDb,
  GetAllBookingsFromDb,
};
