"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    const errorSources = [{
            path: '',
            message: ''
        }];
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources
    });
};
exports.default = globalErrorHandler;
