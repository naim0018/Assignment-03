"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const moduleRoute = [
    {
        path: ,
        route: 
    }
];
moduleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
