import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CarServices } from "./car.service";
//  controller fro crearing a car
const createCar = catchAsync(async (req: Request, res: Response) => {
    const result = await CarServices.createCarIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Car created successfully",
        data: result,
    });
});
//  controller for get all car
const getAllCar = catchAsync(async (req: Request, res: Response) => {
    const result = await CarServices.getAllCarFromDB();

    if (!result) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: " Data not Found",
            data: [],
        });
    }
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Cars retrieved successfully",
        data: result,
    });
});
//   controllers for get singel car
const getSingleCar = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await CarServices.getSingleCarFromDB(id);
    if (!result) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: " Data not Found",
            data: [],
        });
    }
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "A Car retrieved successfully",
        data: result,
    });
});


//  controller for deleting a car
const deleteCar = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CarServices.deleteCarFromDB(id)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Car deleted successfully",
        data: result,
    });
})



const retrunAndUpdate = catchAsync(async (req: Request, res: Response) => {
    const path = req.path == '/return';
    if (path) {

        const bookingData = req.body;
        const result = await CarServices.returnCarFromDB(bookingData);
        //send response from send response components
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Car booked successfully",
            data: result,
        });


    } else {

        const id = req.params.id;
        const result = await CarServices.updateCarIntoDB(id, req.body);

        if (!result) {
            res.status(httpStatus.NOT_FOUND).json({
                success: false,
                statusCode: httpStatus.NOT_FOUND,
                message: " Data not Found",
                data: [],
            });
        }
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Car updated successfully",
            data: result,
        });



    }
})
//export car controllers
export const CarController = {
    createCar,
    getAllCar,
    getSingleCar,
    deleteCar,
    retrunAndUpdate
};