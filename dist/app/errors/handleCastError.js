"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (error) => {
    const errorSources = [{
            path: error.path,
            message: error.message
        }];
    return {
        statusCode: 400,
        message: "Invalid Id",
        errorSources
    };
};
exports.handleCastError = handleCastError;
