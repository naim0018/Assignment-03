"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
