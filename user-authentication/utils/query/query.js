/**
 * Check for any duplicate user record.
 */
export const duplicateUserCheck = (arr, data) => {
    const { username } = data;
    return arr.find((user) => {
        return user.username == username;
    });
};

/**
 * Check user credentials.
 */
export const checkUserExist = (arr, detail) => {
    const userDetail = arr.find((user) => {
        return (
            user.username == detail.username && user.password == detail.password
        );
    });

    const index = arr.findIndex((user) => {
        return (
            user.username == detail.username && user.password == detail.password
        );
    });
    return { index, userDetail };
};
