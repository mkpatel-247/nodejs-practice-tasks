import {
    DEPARTMENT_DB_URL,
    DESIGNATION_DB_URL,
} from "../config/db-url.constant.js";
import { query } from "../controllers/query.js";

export const searchNameField = (dbName, id) => {
    let url = "";
    switch (dbName) {
        case "designation":
            url = DESIGNATION_DB_URL;
            break;
        case "department":
            url = DEPARTMENT_DB_URL;
            break;
    }
    const { detail } = query.findOne(url, id);

    return detail?.name;
};
