import { EMPLOYEE_DB_URL } from "../config/db-url.constant.js";
import { query } from "../controllers/query.js";
import { ERROR } from "../messages/error.message.js";
import { errorResponse } from "../utils/api-response.js";

/**
 * Check the employee salary exist or not. In employee table.
 */
export const isSalaryExist = (req, res, next) => {
    try {
        const { ids } = req.body;
        const employeeData = query.findAll(EMPLOYEE_DB_URL);

        const data = employeeData.filter((record) => {
            return ids.includes(record.id) && !record.salary;
        });

        if (!data.length) {
            return next();
        } else {
            return res.status(403).send(errorResponse(403, ERROR.E07));
        }
    } catch (error) {
        console.log("Error :>> ", error.message);
        return res.status(500).send(errorResponse(500, ERROR.E01));
    }
};
