import { v4 } from "uuid";
import { ERROR } from "../../utils/messages/error.message.js";
import { addDataIntoDB, getDataFromDB } from "../../utils/fileOperation.js";
import { USER_DB_URL } from "../../configs/user.js";

import { SUCCESS } from "../../utils/messages/success.message.js";
import { allowedFields } from "../../utils/userValidation/validation.js";
import { duplicateUserCheck } from "../../utils/query/query.js";
import { errorResponse, successResponse } from "../../utils/apiResponse.js";

/**
 * Add user into DB.
 */
export const userRegister = (req, res, next) => {
    try {
        const insertUserData = req.body;
        if (allowedFields(insertUserData)) {
            const dbData = getDataFromDB(USER_DB_URL);
            if (!duplicateUserCheck(dbData, insertUserData)) {
                dbData.push({ ...insertUserData, id: v4(), token: "" });
                if (addDataIntoDB(USER_DB_URL, dbData)) {
                    return res
                        .status(201)
                        .send(successResponse(201, SUCCESS.S01));
                } else {
                    return next("Server error.");
                }
            }
            return res.status(400).send(errorResponse(400, ERROR.E02));
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
export const userDetail = () => {};
