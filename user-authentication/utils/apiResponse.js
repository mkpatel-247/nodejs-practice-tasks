export const errorResponse = (statusCode, message) => {
    return { statusCode, message };
};

export const successResponse = (statusCode, message, data, token) => {
    const response = {};
    if (statusCode) {
        response["statusCode"] = statusCode;
    }
    if (message) {
        response["message"] = message;
    }
    if (data) {
        response["data"] = data;
    }
    if (token) {
        response["token"] = token;
    }
    return response;
};
