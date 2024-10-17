import express from "express";
import { query } from "../controllers/query.js";
import {
    DEPARTMENT_DB_URL,
    DESIGNATION_DB_URL,
    EMPLOYEE_DB_URL,
    SALARY_HISTORY_DB_URL,
} from "../config/db-url.constant.js";
import { filterData, formatRecord } from "../utils/filter-salary-list.js";
import { currentYear, dateFilter } from "../config/config.js";

const router = express.Router();

/**
 * Home page route.
 */
router.get("/", (req, res, next) => {
    const getEmployee = query.findAll(EMPLOYEE_DB_URL);

    res.render("list", {
        employee: getEmployee,
        dateFilter,
        currentYear,
        currentRoute: "/",
    });
});

/**
 * Add employee and update salary route.
 */
router.get("/add-emp", (req, res, next) => {
    const { id } = req.query;
    const { detail } = query.findOne(EMPLOYEE_DB_URL, id);

    const designation = query.findAll(DESIGNATION_DB_URL);
    const department = query.findAll(DEPARTMENT_DB_URL);

    if (detail?.id) {
        res.render("add-employee", {
            pageTitle: "Edit Employee",
            designation,
            department,
            formField: detail,
            currentRoute: "/add-emp",
        });
    } else {
        res.render("add-employee", {
            pageTitle: "Add Employee",
            designation,
            department,
            formField: detail,
            currentRoute: "/add-emp",
        });
    }
});

/**
 * Salary Listing page.
 */
router.get("/salary-history", (req, res, next) => {
    const { empId, month } = req.query;

    try {
        // Fetch salary history and employee data
        const [data, employees] = [
            query.findAll(SALARY_HISTORY_DB_URL),
            query.findAll(EMPLOYEE_DB_URL),
        ];

        const filteredData = filterData(data, empId, month);

        const formattedData = filteredData.map(formatRecord); // Format the filtered data

        res.status(200).render("salary-list", {
            salaryData: formattedData,
            employee: employees,
            filterApplied: { empId, month },
            dateFilter,
            currentYear,
            currentRoute: "/salary-history",
        });
    } catch (error) {
        console.error("Error in /salary-history route:", error.message);
        next(error);
    }
});

export default router;
