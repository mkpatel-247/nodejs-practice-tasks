import express from "express";
import {
    checkEmail,
    employeeFormFieldCheck,
} from "../middlewares/form-validation.middleware.js";
import {
    addEmployee,
    deleteEmployee,
    getEmployee,
    updateSalary,
} from "../controllers/employee.controller.js";
const router = express.Router();

router.get("/get-employee/:id", getEmployee);

router.post("/add-employee", employeeFormFieldCheck, checkEmail, addEmployee);
router.post("/update-employee/:id", updateSalary);

router.delete("/delete-employee/:id", deleteEmployee);

export default router;
