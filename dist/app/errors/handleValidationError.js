"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (error) => {
    const errorSources = Object.values(error.errors).map((value) => {
        return {
            path: value.path,
            message: value.message
        };
    });
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources
    };
};
exports.handleValidationError = handleValidationError;
