export const apiResponse = (status, message, code) => {
     return { status, message, code };
}

export const dataResponse = (status, message, code, data) => {
     return { status, message, code, data };
}