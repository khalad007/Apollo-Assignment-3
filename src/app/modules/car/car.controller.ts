import httpStatus from 'http-status';

import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { CarServices } from './car.service';

const createCar: RequestHandler = catchAsync(async (req, res) => {
  const result = await CarServices.CreateCarIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Car created successfully',
    data: result,
  });
});

const GetCar: RequestHandler = catchAsync(async (req, res) => {
  const result = await CarServices.GetAllCarsFromDb();
  if(result.length >= 1){
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: result,
    });
  }
  else{
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Cars retrieved successfully',
      data: result,
    });
  }
  
});

const GetCarById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.GetCarBasedId(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'A Car retrieved successfully',
    data: result,
  });
});

const DeleteCar: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.DeleteCarInToDb(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car Deleted successfully',
    data: result,
  });
});

const UpdateCar :RequestHandler = catchAsync(async(req,res)=>{
  const {id} = req.params
  const result = await CarServices.UpdateCarIntoDb(id,req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car updated successfully",
    data: result,
  });
})

const ReturnCar :RequestHandler = catchAsync(async(req,res)=>{
  // console.log('f')
  const result = await CarServices.ReturnCarFromDb(req.body)
  // const result = {hello:'f'}
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car returned successfully",
    data: result,
  });
})

export const CarControllers = {
  createCar,
  GetCar,
  GetCarById,
  ReturnCar,
  DeleteCar,UpdateCar
};
