import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCar } from './car.interface';
import { CarModel } from './car.model';
import { TBooking } from '../booking/booking.interface';
import { BookingModel } from '../booking/booking.model';
import CalculateMoney from './car.utils';

const CreateCarIntoDb = async (payload: TCar) => {
  const result = await CarModel.create(payload);
  const savedResult = await CarModel.findById(result._id);
  return savedResult;
};

const GetAllCarsFromDb = async () => {
  const result = await CarModel.find();

  return result;
};

const GetCarBasedId = async (id: string) => {
  const result = await CarModel.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Didn't found any Car");
  }
  return result;
};

const DeleteCarInToDb = async (id: string) => {
  const result = await CarModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const UpdateCarIntoDb = async (id: string, payload: Partial<TCar>) => {
  const result = await CarModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const ReturnCarFromDb = async (payload: any) => {
  // console.log(payload.bookingId,"f")

  const UpdateData = await BookingModel.findOne({ _id: payload.bookingId })
    .populate('user')
    .populate('car');
  // @ts-ignore
  if (!UpdateData) {
    throw new AppError(httpStatus.FORBIDDEN, "Coludn't find the booking data");
  }
  const money = CalculateMoney(UpdateData, payload.endTime);
  const UpdateCar = await CarModel.findOneAndUpdate(
    { _id: UpdateData.car._id },
    { status: 'available' },
  );
  // console.log(UpdateCar)
  const resultdata = await BookingModel.findOneAndUpdate(
    { _id: payload.bookingId },
    {
      endTime: payload.endTime,
      totalCost: money,
    },
    { new: true },
  );

  const findData = await BookingModel.findOne({ _id: payload.bookingId }).populate('user')
  .populate('car');

  return findData;
};
export const CarServices = {
  CreateCarIntoDb,
  GetCarBasedId,
  GetAllCarsFromDb,
  DeleteCarInToDb,
  UpdateCarIntoDb,
  ReturnCarFromDb,
};
