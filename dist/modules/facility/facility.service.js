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
exports.FacilityService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../app/errors/AppError");
const facility_model_1 = require("./facility.model");
//get all facility from db
const getAllFacilityData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.FacilityModel.find();
    return result;
});
//create facility to db
const createFacilityData = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.FacilityModel.create(payload);
    return result;
});
//update facility from bd using id
const updateFacilityData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isFacilityExist = yield facility_model_1.FacilityModel.findOne({ _id: id });
    if (!isFacilityExist) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Facility not found");
    }
    const result = yield facility_model_1.FacilityModel.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
//deleting facility data from db
const deleteFacilityData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.FacilityModel.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
    return result;
});
exports.FacilityService = {
    getAllFacilityData,
    createFacilityData,
    updateFacilityData,
    deleteFacilityData,
};
