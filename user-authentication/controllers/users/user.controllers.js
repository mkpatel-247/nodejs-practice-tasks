import { v4 } from "uuid";
import { ERROR } from "../../utils/messages/error.message.js";
import { addDataIntoDB, getDataFromDB } from "../../utils/fileOperation.js";
import { USER_DB_URL } from "../../configs/user.js";

import { SUCCESS } from "../../utils/messages/success.message.js";
import { allowedFields } from "../../utils/userValidation/validation.js";
import { duplicateUserCheck } from "../../utils/query/query.js";
import { errorResponse, successResponse } from "../../utils/apiResponse.js";

/**
 * Register user into DB.
 */
export const addUser = (req, res, next) => {
    try {
        const insertUserData = req.body;
        if (allowedFields(insertUserData)) {
            const dbData = getDataFromDB(USER_DB_URL);
            if (!duplicateUserCheck(dbData, insertUserData)) {
                dbData.push({ ...insertUserData, id: v4(), token: "" });
                const isErrorExist = addDataIntoDB(USER_DB_URL, dbData);
                if (!isErrorExist?.message) {
                    return res
                        .status(201)
                        .send(successResponse(201, SUCCESS.S01));
                } else {
                    throw new Error(isErrorExist);
                }
            }
            return res.status(403).send(errorResponse(403, ERROR.E02));
        } else {
            return res.status(400).send(errorResponse(400, ERROR.E01));
        }
    } catch (error) {
        return next(error);
    }
};

/**
 * Get detail of logged in user.
 */
export const userDetail = (req, res, next) => {
    try {
        const userDetails = req?.user?.data;
        if (userDetails) {
            return res
                .status(200)
                .send(successResponse(200, SUCCESS.S04, userDetails));
        }
        throw new Error("Unexpected error.");
    } catch (error) {
        return next(error);
    }
};
