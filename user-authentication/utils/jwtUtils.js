import jwt from "jsonwebtoken";

/**
 * Create a jwt token with expire of 1-hour.
 * @param {*} payload data that need to encrypt into token.
 * @returns
 */
export const generateToken = (payload) => {
    const secretKey = process.env.JWT_PRIVATE_KEY;

    const token = jwt.sign({ data: { ...payload } }, secretKey);
    return token;
};
