import jsonwebtoken from "jsonwebtoken";
import { loginFields } from "../../utils/userValidation/validation.js";
import { ERROR } from "../../utils/messages/error.message.js";
import { addDataIntoDB, getDataFromDB } from "../../utils/fileOperation.js";
import { USER_DB_URL } from "../../configs/user.js";
import { checkUserExist } from "../../utils/query/query.js";
import { errorResponse, successResponse } from "../../utils/apiResponse.js";
import { SUCCESS } from "../../utils/messages/success.message.js";

/**
 * Generate token and make user login.
 */
export const login = (req, res, next) => {
    try {
        const loginDetail = req.body;
        if (loginFields(loginDetail)) {
            const dbData = getDataFromDB(USER_DB_URL);
            const { index, userDetail } = checkUserExist(dbData, loginDetail);
            if (userDetail.token) {
                return res.status(200).send(successResponse(200, SUCCESS.S03));
            }
            if (index != -1) {
                const token = jsonwebtoken.sign(
                    loginDetail.username,
                    process.env.JWT_PRIVATE_KEY
                );
                //Update token.
                dbData[index] = { ...userDetail, token };

                if (addDataIntoDB(USER_DB_URL, dbData)) {
                    return res
                        .status(201)
                        .send(successResponse(201, SUCCESS.S02, "", token));
                }
                return next("Server error.");
            }
            return res.status(404).send(errorResponse(404, ERROR.E03));
        } else {
            return res.status(400).send(errorResponse(400, ERROR.E01));
        }
    } catch (error) {
        return next(error);
    }
};
export const logout = () => {};
