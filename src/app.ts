/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application } from 'express';
import router from './app/route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: ['http://loclhost:5173/api/v1'] }));

// application routes
app.use('/api', router);

// app.get('/', test);
app.get("/", (req, res) => {
    res.json({
        message: " Car Rental Reservation System API Service is Running!",
    });
});
app.use(globalErrorHandler);
//Not Found
app.use(notFound);

//  export app
export default app;
