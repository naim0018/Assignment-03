"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRoute = void 0;
const express_1 = require("express");
const facility_controller_1 = require("./facility.controller");
const validateRequest_1 = require("../../app/middleware/validateRequest");
const facility_validation_1 = require("./facility.validation");
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const auth_utils_1 = require("../auth/auth.utils");
const router = (0, express_1.Router)();
//get all facility
router.get('/', facility_controller_1.FacilityController.getAllFacility);
//create facility
router.post('/', (0, auth_1.default)(auth_utils_1.UserRole.admin), (0, validateRequest_1.validationRequest)(facility_validation_1.FacilityValidation.createFacilitySchema), facility_controller_1.FacilityController.createFacility);
//update facility
router.put('/:id', (0, auth_1.default)(auth_utils_1.UserRole.admin), (0, validateRequest_1.validationRequest)(facility_validation_1.FacilityValidation.updateFacilitySchema), facility_controller_1.FacilityController.updateFacility);
//delete facility
router.delete('/:id', (0, auth_1.default)(auth_utils_1.UserRole.admin), (0, validateRequest_1.validationRequest)(facility_validation_1.FacilityValidation.updateFacilitySchema), facility_controller_1.FacilityController.deleteFacility);
exports.FacilityRoute = router;
