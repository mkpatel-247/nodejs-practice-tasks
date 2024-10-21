import validator from "validator";
import { errorResponse } from "../utils/api-response.js";
import { ERROR } from "../messages/error.message.js";
import { query } from "../controllers/query.js";
import { EMPLOYEE_DB_URL } from "../config/db-url.constant.js";

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
        return res.status(400).send(errorResponse(400, ERROR.E05));
    } else {
        next();
    }
};

export const isDuplicate = (req, res, next) => {
    const { name, email, joiningDate, department, designation, gender } =
        req.body;
    try {
        const data = query.findAll(EMPLOYEE_DB_URL);
        const index = data.findIndex((records) => records?.email == email);
        if (index == -1) {
            next();
        } else {
            return res.status(403).send(errorResponse(403, ERROR.E08));
        }
    } catch (error) {
        return res.status(500).send(errorResponse(500, ERROR.E01));
    }
};
