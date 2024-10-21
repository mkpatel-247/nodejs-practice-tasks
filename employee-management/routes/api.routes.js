import express from "express";
import {
    checkEmail,
    employeeFormFieldCheck,
    isDuplicate,
} from "../middlewares/form-validation.middleware.js";
import {
    addEmployee,
    deleteEmployee,
    getEmployee,
    sendSalary,
    updateSalary,
} from "../controllers/employee.controller.js";
import { isSalaryExist } from "../middlewares/isSalaryExist.middleware.js";

const router = express.Router();

router.get("/get-employee/:id", getEmployee);

router.post(
    "/add-employee",
    employeeFormFieldCheck,
    checkEmail,
    isDuplicate,
    addEmployee
);

router.post("/update-employee/:id", updateSalary);

router.delete("/delete-employee/:id", deleteEmployee);

router.post("/send-salary/:month", isSalaryExist, sendSalary);

export default router;
