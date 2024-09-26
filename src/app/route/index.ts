import { Router } from "express";
import { CarRoutes } from "../modules/car/car.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { AuthRoutes } from "../modules/auth/auth.route";


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    // {
    //     path: "/users",
    //     route: UserRoutes,
    //   },
    {
        path: "/cars",
        route: CarRoutes,
    },
    {
        path: "/bookings",
        route: BookingRoutes,
    },
    



    

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
