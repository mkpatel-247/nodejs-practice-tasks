export const errorResponse = (status, message) => {
    return { status, message };
};

export const successResponse = (status, message, data) => {
    const response = { status, message };
    if (data) {
        response["data"] = data;
    }
    return response;
};
