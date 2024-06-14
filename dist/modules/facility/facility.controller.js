"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../app/utils/catchAsync");
const sendResponse_1 = require("../../app/utils/sendResponse");
const facility_service_1 = require("./facility.service");
//get all facility
const getAllFacility = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_service_1.FacilityService.getAllFacilityData();
    const isEmptyResult = !result || Object.keys(result).length === 0;
    (0, sendResponse_1.sendResponse)(res, {
        success: isEmptyResult ? false : true,
        statusCode: isEmptyResult ? http_status_codes_1.StatusCodes.NOT_FOUND : http_status_codes_1.StatusCodes.OK,
        message: isEmptyResult ? "No data found" : "Facilities retrieved successfully",
        data: result
    });
}));
//create facility
const createFacility = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_service_1.FacilityService.createFacilityData(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Facility added successfully",
        data: result
    });
}));
//update facility
const updateFacility = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_service_1.FacilityService.updateFacilityData(req.params.id, req.body);
    const isEmptyResult = !result || Object.keys(result).length === 0;
    (0, sendResponse_1.sendResponse)(res, {
        success: isEmptyResult ? false : true,
        statusCode: isEmptyResult ? http_status_codes_1.StatusCodes.NOT_FOUND : http_status_codes_1.StatusCodes.OK,
        message: isEmptyResult ? "No data found" : "Facility updated successfully",
        data: result
    });
}));
//delete facility data 
const deleteFacility = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_service_1.FacilityService.deleteFacilityData(req.params.id);
    const isEmptyResult = !result || Object.keys(result).length === 0;
    (0, sendResponse_1.sendResponse)(res, {
        success: isEmptyResult ? false : true,
        statusCode: isEmptyResult ? http_status_codes_1.StatusCodes.NOT_FOUND : http_status_codes_1.StatusCodes.OK,
        message: isEmptyResult ? "No data found" : "Facility deleted successfully",
        data: result
    });
}));
exports.FacilityController = {
    getAllFacility,
    createFacility,
    updateFacility,
    deleteFacility,
};
