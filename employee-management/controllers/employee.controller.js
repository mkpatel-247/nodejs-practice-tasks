import { ERROR } from "../messages/error.message.js";
import { errorResponse, successResponse } from "../utils/api-response.js";
import { query, writeFile } from "./query.js";
import { EMPLOYEE_DB_URL } from "../config/db-url.constant.js";
import { SUCCESS } from "../messages/success.messages.js";
import { v4 } from "uuid";

export const addEmployee = (req, res, next) => {
    try {
        const { name, email, joiningDate, department, designation, gender } =
            req.body;
        const detail = {
            id: v4,
            name,
            email,
            joiningDate,
            department,
            designation,
            gender,
        };
        const getEmployee = query.findAll(EMPLOYEE_DB_URL);
        getEmployee.push(detail);
        writeFile(EMPLOYEE_DB_URL, getEmployee); //write into file.
        return res.status(200).send(successResponse(200, SUCCESS.S03));
    } catch (error) {
        console.log("Error while adding employee:>> ", error.message);
        return res.status(400).send(errorResponse(400, ERROR.E04));
    }
};

export const deleteEmployee = (req, res, next) => {
    try {
        const { id } = req.params;
        const { index, detail } = query.findOne(EMPLOYEE_DB_URL, id);
        getEmployee.splice(index, 1);
        writeFile(EMPLOYEE_DB_URL, getEmployee); //write into file.
        return res.status(200).send(successResponse(200, SUCCESS.S04));
    } catch (error) {
        console.log("Error while adding employee:>> ", error.message);
        return res.status(500).send(errorResponse(500, ERROR.E01));
    }
};
