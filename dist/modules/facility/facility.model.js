"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityModel = void 0;
const mongoose_1 = require("mongoose");
const facilitySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"]
    },
    description: {
        type: String,
        required: [true, "Description is Required"]
    },
    pricePerHour: {
        type: Number,
        required: [true, "PricePerHour is Required"]
    },
    location: {
        type: String,
        required: [true, "Location is Required"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    versionKey: false
});
//removing the deleted data
facilitySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
//removing deleted data on findOne
facilitySchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
//removing deleted data from findOneAndUpdate operation
facilitySchema.pre('findOneAndUpdate', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
//facilityModel
exports.FacilityModel = (0, mongoose_1.model)('Facility', facilitySchema);
