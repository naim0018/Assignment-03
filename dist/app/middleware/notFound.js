"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const http_status_codes_1 = require("http-status-codes");
const notFound = (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: true,
        statusCode: 404,
        message: "Not Found",
    });
};
exports.notFound = notFound;
