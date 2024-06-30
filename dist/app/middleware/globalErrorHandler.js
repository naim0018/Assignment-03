"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = require("../errors/handleZodError");
const handleValidationError_1 = require("../errors/handleValidationError");
const handleDuplicateId_1 = require("../errors/handleDuplicateId");
const AppError_1 = require("../errors/AppError");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';
    let errorSources = [{
            path: '',
            message: message
        }];
    if (err instanceof zod_1.ZodError) {
        const error = (0, handleZodError_1.handleZodError)(err);
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode,
            message = error === null || error === void 0 ? void 0 : error.message,
            errorSources = error === null || error === void 0 ? void 0 : error.errorSources;
    }
    else if (err.name === 'ValidationError') {
        const error = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode,
            message = error === null || error === void 0 ? void 0 : error.message,
            errorSources = error === null || error === void 0 ? void 0 : error.errorSources;
    }
    else if (err.code === 11000) {
        const error = (0, handleDuplicateId_1.handleDuplicateId)(err);
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode,
            message = error === null || error === void 0 ? void 0 : error.message,
            errorSources = error === null || error === void 0 ? void 0 : error.errorSources;
    }
    else if (err instanceof AppError_1.AppError) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode,
            message = err === null || err === void 0 ? void 0 : err.message,
            errorSources = [{
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message
                }];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources
    });
};
exports.default = globalErrorHandler;
