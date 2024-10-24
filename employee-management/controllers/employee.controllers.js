import { ERROR } from "../messages/error.message.js";
import { errorResponse, successResponse } from "../utils/api-response.js";
import { SUCCESS } from "../messages/success.messages.js";
import employeeModel from "../models/employee.model.js";

/**
 * Add employee into database.
 */
export const addEmployee = async (req, res, next) => {
    try {
        const {
            id,
            name,
            email,
            joiningDate,
            department,
            designation,
            gender,
        } = req.body;

        const detail = {
            name,
            email,
            joiningDate,
            department,
            designation,
            gender,
        };
        if (!id) {
            await employeeModel
                .create(detail)
                .then(() => {
                    return res
                        .status(201)
                        .send(successResponse(201, SUCCESS.S03));
                })
                .catch((err) => {
                    console.log("Error :>> ", err.message);
                    return res
                        .status(400)
                        .send(errorResponse(400, err.message));
                });
        } else {
            await employeeModel
                .updateOne({ _id: id }, { ...detail, salary: req.body.salary })
                .then(() => {
                    return res
                        .status(200)
                        .send(successResponse(200, SUCCESS.S08));
                })
                .catch((err) => {
                    return res
                        .status(400)
                        .send(errorResponse(400, err.message));
                });
        }
    } catch (error) {
        console.log("Error while addEmployee controllers:>> ", error.message);
        return res.status(400).send(errorResponse(400, ERROR.E04));
    }
};

/**
 * Delete employee from database.
 */
export const deleteEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;

        await employeeModel.updateOne({ _id: id }, { isDeleted: true }).exec();

        return res.status(200).send(successResponse(200, SUCCESS.S04));
    } catch (error) {
        console.log("Error in deleteEmployee controllers :>> ", error.message);
        return res.status(500).send(errorResponse(500, ERROR.E01));
    }
};

/**
 * Returns employee details is present.
 */
export const getEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;
        const detail = await employeeModel.findById(id); // query.findOne(EMPLOYEE_DB_URL, id);

        if (detail?._id) {
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
