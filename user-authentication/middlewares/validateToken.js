import jwt from "jsonwebtoken";
import { ERROR } from "../utils/messages/error.message.js";
import { errorResponse } from "../utils/apiResponse.js";

/**
 * Verify token is valid or not and is not expired.
 */
export const verifyToken = (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];

        if (token) {
            jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, payload) => {
                if (err) {
                    res.status(403).send(errorResponse(403, ERROR.E04));
                } else {
                    /**
                     * set user in request through which it data can be used next immediate function call.
                     */
                    req.user = payload;
                    next();
                }
            });
        } else {
            res.status(404).send(errorResponse(404, ERROR.E05));
        }
    } catch (error) {
        next(error);
    }
};
