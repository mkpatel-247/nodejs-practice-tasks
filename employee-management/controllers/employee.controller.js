import { ERROR } from "../messages/error.message.js";
import { errorResponse, successResponse } from "../utils/api-response.js";
import { query, writeFile } from "./query.js";
import { EMPLOYEE_DB_URL } from "../config/db-url.constant.js";
import { SUCCESS } from "../messages/success.messages.js";
import { v4 } from "uuid";

/**
 * Add employee into database.
 */
export const addEmployee = (req, res, next) => {
    try {
        const { name, email, joiningDate, department, designation, gender } =
            req.body;
        const getEmployee = query.findAll(EMPLOYEE_DB_URL);

        const detail = {
            id: v4(),
            name,
            email,
            joiningDate,
            department,
            designation,
            gender,
            salary: 0,
        };
        getEmployee.push(detail);
        writeFile(EMPLOYEE_DB_URL, getEmployee); //write into file.
        return res.status(200).send(successResponse(200, SUCCESS.S03));
    } catch (error) {
        console.log("Error while adding controllers:>> ", error.message);
        return res.status(400).send(errorResponse(400, ERROR.E04));
    }
};

/**
 * Delete employee from database.
 */
export const deleteEmployee = (req, res, next) => {
    try {
        const { id } = req.params;
        const { index } = query.findOne(EMPLOYEE_DB_URL, id);
        const employeeRecords = query.findAll(EMPLOYEE_DB_URL);
        employeeRecords.splice(index, 1);

        writeFile(EMPLOYEE_DB_URL, employeeRecords); //write into file.

        return res.status(200).send(successResponse(200, SUCCESS.S04));
    } catch (error) {
        console.log("Error in deleteEmployee controllers :>> ", error.message);
        return res.status(500).send(errorResponse(500, ERROR.E01));
    }
};

/**
 * Returns employee details is present.
 */
export const getEmployee = (req, res, next) => {
    try {
        const { id } = req.params;
        const { detail } = query.findOne(EMPLOYEE_DB_URL, id);
        if (detail?.id) {
            return res
                .status(200)
                .send(successResponse(200, SUCCESS.S05, detail));
        }
        return res.status(400).send(successResponse(400, ERROR.E04, {}));
    } catch (error) {
        console.log("Error in getEmployee controllers :>> ", error.message);
        return res.status(500).send(errorResponse(500, ERROR.E01));
    }
};

/**
 * Update salary.
 */
export const updateSalary = (req, res, next) => {
    try {
        const { id } = req.params;
        const { salary } = req.body;

        const getEmployee = query.findAll(EMPLOYEE_DB_URL);
        console.log("object :>> ", salary, id);
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
