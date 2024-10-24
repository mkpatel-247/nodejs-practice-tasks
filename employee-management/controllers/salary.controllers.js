import { removeDuplicate } from "../utils/check-salary.js";
import { ERROR } from "../messages/error.message.js";
import { errorResponse, successResponse } from "../utils/api-response.js";
import { SUCCESS } from "../messages/success.messages.js";

/**
 * Update salary.
 */
export const updateSalary = (req, res, next) => {
    try {
        const { id } = req.params;
        const { salary } = req.body;

        const getEmployee = query.findAll(EMPLOYEE_DB_URL);

        if (id) {
            const { detail, index } = query.findOne(EMPLOYEE_DB_URL, id);
            getEmployee[index] = { ...detail, salary: salary };
            writeFile(EMPLOYEE_DB_URL, getEmployee);
            return res.status(200).send(successResponse(200, "Salary update."));
        }
        return res.status(400).send(successResponse(400, ERROR.E04, {}));
    } catch (error) {
        console.log("Error in getEmployee controllers :>> ", error.message);
        return res.status(500).send(errorResponse(500, ERROR.E01));
    }
};

/**
 * Store salary data if not store for that month.
 */
export const sendSalary = (req, res, next) => {
    try {
        const { ids } = req.body;
        const { month } = req.params;
        const allowedMonth = ["09", "10", "11", "12"];

        if (allowedMonth.includes(month)) {
            const getSalaryHistory = query.findAll(SALARY_HISTORY_DB_URL);

            const getEmployee = query.findAll(EMPLOYEE_DB_URL);

            const validRecords = removeDuplicate(getSalaryHistory, month, ids);

            if (validRecords.length) {
                const idSet = new Set(validRecords);
                const data = getEmployee
                    .filter((record) => idSet.has(record.id))
                    .map((record) => ({
                        id: record.id,
                        salary: record.salary,
                    }));

                data.forEach((element) => {
                    getSalaryHistory.push({
                        ...element,
                        month,
                        createdAt: Date.now(),
                    });
                });

                writeFile(SALARY_HISTORY_DB_URL, getSalaryHistory);

                return res.status(201).send(successResponse(201, SUCCESS.S06));
            }
            return res.status(200).send(successResponse(200, SUCCESS.S07));
        }
        return res.status(400).send(errorResponse(400, ERROR.E06));
    } catch (error) {
        console.log("Error :>> ", error.message);
        return res.status(400).send(errorResponse(400, ERROR.E06));
    }
};