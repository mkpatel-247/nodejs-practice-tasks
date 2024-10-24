import { ERROR } from "../messages/error.message.js";
import employeeModel from "../models/employee.model.js";
import { errorResponse } from "../utils/api-response.js";

/**
 * Check the employee salary exist or not. In employee table.
 */
export const isSalaryExist = async (req, res, next) => {
    try {
        const { ids } = req.body;
        //TODO: Filter the for isPaid or not.
        /* const employeeData = await employeeModel.aggregate([
            {
                $match: {
                    $and: [{ salary: { $ne: 0 } }, { isDeleted: false }],
                },
            },
            {
                $match: { _id: {} },
            },
        ]); // query.findAll(EMPLOYEE_DB_URL); */

        // const data = employeeData.filter((record) => {
        //     return ids.includes(record.id) && !record.salary;
        // });

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
