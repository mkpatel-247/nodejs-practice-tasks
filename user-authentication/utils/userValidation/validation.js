/**
 * Check the user has not added any extra field.
 */
export const allowedFields = (userDetail) => {
    const { username, firstName, lastName, password } = userDetail;
    if (!username || !firstName || !lastName || !password) {
        return false;
    }
    return true;
};

/**
 * Check for username and password.
 */
export const loginFields = (data) => {
    const { username, password } = data;
    if (!username || !password) {
        return false;
    }
    return true;
};
