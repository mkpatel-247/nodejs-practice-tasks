import express from "express";
import { query } from "../controllers/query.js";
import {
    DEPARTMENT_DB_URL,
    DESIGNATION_DB_URL,
    EMPLOYEE_DB_URL,
    SALARY_HISTORY_DB_URL,
} from "../config/db-url.constant.js";
import moment from "moment";
import {
    employeeWise,
    monthWise,
    filterEmployeeAndMonth,
} from "../utils/filter-salary-list.js";
import { dateFilter } from "../config/config.js";

const router = express.Router();

router.get("/", (req, res, next) => {
    const getEmployee = query.findAll(EMPLOYEE_DB_URL);

    res.render("list", { employee: getEmployee });
});

router.get("/add-emp", (req, res, next) => {
    const { id } = req.query;
    const { detail, index } = query.findOne(EMPLOYEE_DB_URL, id);
    console.log("detail :>> ", detail);

    const designation = query.findAll(DESIGNATION_DB_URL);
    const department = query.findAll(DEPARTMENT_DB_URL);

    if (detail?.id) {
        res.render("add-employee", {
            pageTitle: "Edit Employee",
            designation,
            department,
            formField: detail,
        });
    } else {
        res.render("add-employee", {
            pageTitle: "Add Employee",
            designation,
            department,
            formField: detail,
        });
    }
});

/**
 * Salary Listing page.
 */
router.get("/salary-history", (req, res, next) => {
    const { empId, month } = req.query;
    console.log("🚀 ~ router.get ~ empId, month:", empId, month);

    const data = query.findAll(SALARY_HISTORY_DB_URL);
    const employee = query.findAll(EMPLOYEE_DB_URL);

    let newData = [];
    if (empId) {
        newData = employeeWise(data, empId).map((record) => {
            return {
                ...record,
                createdAt: moment(record.createdAt).format("LLL"),
                name: query.findOne(EMPLOYEE_DB_URL, record.id)?.detail?.name,
            };
        });
    } else if (month) {
        newData = monthWise(data, month).map((record) => {
            return {
                ...record,
                createdAt: moment(record.createdAt).format("LLL"),
                name: query.findOne(EMPLOYEE_DB_URL, record.id)?.detail?.name,
            };
        });
    } else if (month && empId) {
        newData = filterEmployeeAndMonth(data, empId, month).map((record) => {
            return {
                ...record,
                createdAt: moment(record.createdAt).format("LLL"),
                name: query.findOne(EMPLOYEE_DB_URL, record.id)?.detail?.name,
            };
        });
    } else {
        newData = data.map((record) => {
            return {
                ...record,
                createdAt: moment(record.createdAt).format("LLL"),
                name: query.findOne(EMPLOYEE_DB_URL, record.id)?.detail?.name,
            };
        });
    }
    res.status(200).render("salary-list", {
        salaryData: newData,
        employee,
        dateFilter,
    });
});

export default router;
