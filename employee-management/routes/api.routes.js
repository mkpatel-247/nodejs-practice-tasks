import express from "express";
import {
    checkEmail,
    employeeFormFieldCheck,
} from "../middlewares/form-validation.middleware.js";
import {
    addEmployee,
    deleteEmployee,
    getEmployee
} from "../controllers/employee.controller.js";
const router = express.Router();

router.get("/get-employee/:id", getEmployee)

router.post("/add-employee", employeeFormFieldCheck, checkEmail, addEmployee);

router.delete("/delete-employee/:id", deleteEmployee);

export default router;
