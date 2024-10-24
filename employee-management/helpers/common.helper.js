/**
 * Compare String or ObjectId.
 * @param {*} str1 String
 * @param {*} str2 String
 * @returns boolean
 */
export const compareObjectId = (str1, str2) => {
    if (typeof str1 == "object" && typeof str2 == "object") {
        return str1.toHexString() == str2.toHexString();
    }
    return str1 == str2;
};
