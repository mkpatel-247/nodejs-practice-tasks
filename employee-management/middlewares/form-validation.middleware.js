import validator from "validator";
import { errorResponse } from "../utils/api-response.js";
import { ERROR } from "../messages/error.message.js";

/**
 * Validate email input.
 */
export const checkEmail = (req, res, next) => {
    const { email } = req.body;
    if (validator.isEmail(email)) {
        next();
    } else {
        return res.status(400).send(errorResponse(400, ERROR.E03));
    }
};

/**
 * Check the required field are present in body or not.
 */
export const employeeFormFieldCheck = (req, res, next) => {
    const { name, email, joiningDate, department, designation, gender } =
        req.body;

    if (
        !name ||
        !email ||
        !joiningDate ||
        !department ||
        !designation ||
        !gender
    ) {
        return res.status(403).send(errorResponse(403, ERROR.E05));
    } else {
        next();
    }
};
