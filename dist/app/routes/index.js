"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../../modules/auth/auth.route");
const facility_route_1 = require("../../modules/facility/facility.route");
const booking_route_1 = require("../../modules/booking/booking.route");
const user_route_1 = require("../../modules/user/user.route");
const check_route_1 = require("../../modules/checkAvailability/check.route");
const router = (0, express_1.Router)();
//module route
const moduleRoute = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoute
    },
    {
        path: '/facility',
        route: facility_route_1.FacilityRoute
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoute
    },
    {
        path: '/user',
        route: user_route_1.UserRoute
    },
    {
        path: '/check-availability',
        route: check_route_1.CheckAvailabilityRoute
    },
];
moduleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
