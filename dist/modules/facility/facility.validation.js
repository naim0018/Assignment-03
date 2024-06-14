"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityValidation = void 0;
const zod_1 = require("zod");
const createFacilitySchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Name is Required"),
    description: zod_1.z.string().nonempty("Description is Required"),
    pricePerHour: zod_1.z.number().nonnegative("PricePerHour must be a positive number"),
    location: zod_1.z.string().nonempty("Location is Required"),
});
const updateFacilitySchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Name is Required").optional(),
    description: zod_1.z.string().nonempty("Description is Required").optional(),
    pricePerHour: zod_1.z.number().nonnegative("PricePerHour must be a positive number").optional(),
    location: zod_1.z.string().nonempty("Location is Required").optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.FacilityValidation = {
    createFacilitySchema,
    updateFacilitySchema,
};
