import express from "express";
import {
    checkEmail,
    employeeFormFieldCheck,
} from "../middlewares/form-validation.middleware.js";
import {
    addEmployee,
    deleteEmployee,
} from "../controllers/employee.controller.js";
const router = express.Router();

router.post("/add-employee", employeeFormFieldCheck, checkEmail, addEmployee);

router.delete("/delete-employee/:id", deleteEmployee);

export default router;
