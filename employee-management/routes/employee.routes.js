import express from "express";
import {
    checkEmail,
    employeeFormFieldCheck,
} from "../middlewares/form-validation.middleware.js";
import {
    addEmployee,
    deleteEmployee,
    getEmployee,
} from "../controllers/employee.controllers.js";
import employeeModel from "../models/employee.model.js";
import designationModel from "../models/designation.model.js";
import departmentModel from "../models/department.model.js";
import { aggregateListEmployee } from "../services/employee.service.js";

const router = express.Router();

/**
 * Home page route.
 */
router.get("/", async (req, res, next) => {
    const employee = await aggregateListEmployee();

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
    const detail = await employeeModel.findById(id).lean();

    const designation = await designationModel.find().lean();
    const department = await departmentModel.find().lean();

    if (detail?._id) {
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
            formField: {},
            currentRoute: "/add-emp",
        });
    }
});

router.get("/get-employee/:id", getEmployee);

router.post("/add-employee", employeeFormFieldCheck, checkEmail, addEmployee);

router.delete("/delete-employee/:id", deleteEmployee);

export default router;
