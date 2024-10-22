import express from "express";
import { aggregateListEmployee, query } from "../controllers/query.js";
import {
    EMPLOYEE_DB_URL,
    SALARY_HISTORY_DB_URL,
} from "../config/db-url.constant.js";
import { filterData, formatRecord } from "../utils/filter-salary-list.js";
import { currentYear, dateFilter } from "../config/config.js";
import employeeModel from "../models/employee.model.js";
import designationModel from "../models/designation.model.js";
import departmentModel from "../models/department.model.js";

const router = express.Router();

/**
 * Home page route.
 */
router.get("/", async (req, res, next) => {
    const employee = await aggregateListEmployee();
    console.log("🚀 ~ router.get ~ employee:", employee);
    res.render("list", {
        employee: employee,
        dateFilter,
        currentYear,
        currentRoute: "/",
    });
});

/**
 * Add employee and update salary route.
 */
router.get("/add-emp", async (req, res, next) => {
    const { id } = req.query;
    const detail = await employeeModel.findById(id);
    console.log("🚀 ~ router.get ~ detail:", detail);

    const designation = await designationModel.find().lean();
    const department = await departmentModel.find().lean();

    if (detail?._id) {
        res.render("add-employee", {
            pageTitle: "Edit Employee",
            designation,
            department,
            formField: {},
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
