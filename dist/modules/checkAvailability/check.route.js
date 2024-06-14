"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAvailabilityRoute = void 0;
const express_1 = require("express");
const check_controller_1 = require("./check.controller");
const router = (0, express_1.Router)();
router.get('/', check_controller_1.checkAvailability);
exports.CheckAvailabilityRoute = router;
