export const apiResponse = (status, message, code) => {
     return { status, message, statusCode: code };
}

export const dataResponse = (status, message, code, data) => {
     return { status, message, statusCode: code, data };
}