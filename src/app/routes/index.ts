import { Router } from "express";
import { AuthRoute } from "../../modules/auth/auth.route";
import { FacilityRoute } from "../../modules/facility/facility.route";
import { BookingRoute } from "../../modules/booking/booking.route";
import { UserRoute } from "../../modules/user/user.route";
import { CheckAvailabilityRoute } from "../../modules/checkAvailability/check.route";


const router= Router()
//module route
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
    {
        path:'/user',
        route:UserRoute
    },
    {
        path:'/check-availability',
        route:CheckAvailabilityRoute
    },
]

moduleRoute.forEach((route)=>router.use(route.path,route.route))
export default router