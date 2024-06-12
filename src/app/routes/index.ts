import { Router } from "express";
import { AuthRoute } from "../../modules/auth/auth.route";
import { FacilityRoute } from "../../modules/facility/facility.route";
import { BookingRoute } from "../../modules/booking/booking.route";


const router= Router()

const moduleRoute =[
    {
        path:'/auth',
        route:AuthRoute
    },
    {
        path:'/facility',
        route:FacilityRoute
    },
    {
        path:'/bookings',
        route:BookingRoute
    },
]

moduleRoute.forEach((route)=>router.use(route.path,route.route))
export default router