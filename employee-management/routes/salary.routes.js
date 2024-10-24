import express from "express";
import { sendSalary } from "../controllers/salary.controllers.js";
import { isSalaryExist } from "../middlewares/isSalaryExist.middleware.js";
import employeeModel from "../models/employee.model.js";
import salaryHistoryModel from "../models/salary-history.model.js";

const router = express.Router();

/**
 * Salary Listing page.
 */
router.get("/salary-history", async (req, res, next) => {
    const { empId, month } = req.query;

    try {
        // Fetch salary history and employee data
        const [salaryData, employees] = await Promise.all([
            salaryHistoryModel.find().lean(),
            employeeModel.find().lean(),
        ]);
        // const [data, employees] = [
        //     query.findAll(SALARY_HISTORY_DB_URL),
        //     query.findAll(EMPLOYEE_DB_URL),
        // ];

        // const filteredData = filterData(data, empId, month);

        // const formattedData = filteredData.map(formatRecord); // Format the filtered data

        res.status(200).render("salary-list", {
            salaryData: {}, //formattedData,
            employee: {}, //employees,
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

router.post("/send-salary/:month", isSalaryExist, sendSalary);

export default router;
