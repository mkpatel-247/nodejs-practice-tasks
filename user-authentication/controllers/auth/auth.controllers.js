import { loginFields } from "../../utils/userValidation/validation.js";
import { ERROR } from "../../utils/messages/error.message.js";
import { addDataIntoDB, getDataFromDB } from "../../utils/fileOperation.js";
import { USER_DB_URL } from "../../configs/user.js";
import { checkUserExist, findLoggedInUser } from "../../utils/query/query.js";
import { errorResponse, successResponse } from "../../utils/apiResponse.js";
import { SUCCESS } from "../../utils/messages/success.message.js";
import { generateToken } from "../../utils/jwtUtils.js";

/**
 * Generate token and make user login.
 */
export const login = (req, res, next) => {
    try {
        const loginDetail = req.body;
        if (loginFields(loginDetail)) {
            const dbData = getDataFromDB(USER_DB_URL);
            const { index, userDetail } = checkUserExist(dbData, loginDetail);
            if (userDetail?.token) {
                return res.status(200).send(successResponse(200, SUCCESS.S03));
            }
            if (index != -1) {
                const { password, ...rest } = userDetail;
                const newToken = generateToken(rest);
                //Update token.
                dbData[index] = { ...userDetail, token: newToken };

                if (addDataIntoDB(USER_DB_URL, dbData)) {
                    return res
                        .status(201)
                        .send(successResponse(201, SUCCESS.S02, "", newToken));
                }
                throw new Error("Record not added into db.");
            }
            return res.status(404).send(errorResponse(404, ERROR.E03));
        } else {
            return res.status(400).send(errorResponse(400, ERROR.E01));
        }
    } catch (error) {
        return next(error);
    }
};

/**
 * Make user logout.
 */
export const logout = (req, res, next) => {
    try {
        const userDetails = req?.user?.data;
        const { id } = userDetails;
        if (id) {
            const dbData = getDataFromDB(USER_DB_URL);
            const { index, details } = findLoggedInUser(dbData, id);
            console.log(details?.token);
            if (index != -1 && details.token) {
                dbData[index] = { ...details, token: "" };
                return res.status(200).send(successResponse(200, SUCCESS.S05));
            } else {
                return res.status(404).send(errorResponse(404, ERROR.E06));
            }
        } else {
            return res.status(406).send(errorResponse(406, ERROR.E04));
        }
    } catch (error) {
        return next(error);
    }
};
