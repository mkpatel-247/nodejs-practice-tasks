import { DESIGNATION_DB_URL } from "../config/db-url.constant.js";
import { ERROR } from "../messages/error.message.js";
import { SUCCESS } from "../messages/success.messages.js";
import { errorResponse, successResponse } from "../utils/api-response.js";
import { query } from "./query.js";

/**
 * Get all designation details.
 */
export const getAllDesignation = (req, res, next) => {
    try {
        const designation = query.findAll(DESIGNATION_DB_URL);
        res.status(200).send(successResponse(200, SUCCESS.S01, designation));
    } catch (error) {
        res.status(500).send(errorResponse(500, ERROR.E01));
    }
};

/**
 * Find designation detail and index by id.
 */
export const getDesignationById = (id) => {
    try {
        const { detail, index } = query.findOne(DESIGNATION_DB_URL, id);
        if (detail?.id) {
            res.status(200).send(successResponse(200, SUCCESS.S02, detail));
        } else {
            res.status(404).send(errorResponse(404, ERROR.E02));
        }
    } catch (error) {
        res.status(500).send(errorResponse(500, ERROR.E01));
    }
};
