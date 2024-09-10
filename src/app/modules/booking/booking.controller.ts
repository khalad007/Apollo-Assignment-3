import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const CreateBooking = catchAsync(async (req, res) => {
  // @ts-ignore
  const { user, body } = req;
  const result = await BookingServices.CreateBookingIntoDb(body, user._id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car booked successfully',
    data: result,
  });
});

const GetMyBooking = catchAsync(async (req, res) => {
  // @ts-ignore
  const { user } = req;
  const result = await BookingServices.GetMyBookingFromDb(user._id);

  if (result.length >= 1) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: result,
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'My Bookings retrieved successfully',
      data: result,
    });
  }
});

const GetAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.GetAllBookingsFromDb(req.query);
  if (result.length >= 1) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: result,
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Bookings retrieved successfully',
      data: result,
    });
  }
});

export const BookingController = {
  CreateBooking,
  GetMyBooking,
  GetAllBookings,
};
