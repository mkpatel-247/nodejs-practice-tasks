import moment from "moment";
import { EMPLOYEE_DB_URL } from "../config/db-url.constant.js";
import { query } from "../controllers/query.js";

/**
 * Filter record based on given empId and month.
 */
export const filterData = (data, empId = null, month = null) => {
    return data.filter((record) => {
        const matchesEmpId = empId ? record.id == empId : true;
        const matchesMonth = month ? record.month == month : true;
        return matchesEmpId && matchesMonth;
    });
};

/**
 * Format the records of salary history data.
 */
export const formatRecord = (record) => ({
    ...record,
    createdAt: moment(record.createdAt).format("LLL"),
    name:
        query.findOne(EMPLOYEE_DB_URL, record.id)?.detail?.name ||
        "(Not found)",
});
