export const errorResponse = (statusCode, message) => {
    return { statusCode, message };
};

export const successResponse = (statusCode, message, data) => {
    const response = { statusCode, message };
    if (data) {
        response["data"] = data;
    }
    return response;
};
