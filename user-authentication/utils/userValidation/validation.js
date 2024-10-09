/**
 * Check the user has not added any extra field.
 */
export const allowedFields = (userDetail) => {
    const { username, firstName, lastName, password, ...rest } = userDetail;
    if (
        (Object.keys(rest).length || !username,
        !firstName,
        !lastName,
        !password)
    ) {
        return false;
    }
    return true;
};

/**
 * Check for username and password.
 */
export const loginFields = (data) => {
    const { username, password, ...rest } = data;
    if (Object.keys(rest).length || !username || !password) {
        return false;
    }
    return true;
};
