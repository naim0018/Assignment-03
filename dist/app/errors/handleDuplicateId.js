"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateId = void 0;
const handleDuplicateId = (error) => {
    const match = error.message.match(/"([^"]*)"/);
    const extractedValue = match && match[1];
    const errorSources = [
        {
            path: "",
            message: extractedValue
        }
    ];
    return {
        statusCode: 11000,
        message: extractedValue,
        errorSources
    };
};
exports.handleDuplicateId = handleDuplicateId;
