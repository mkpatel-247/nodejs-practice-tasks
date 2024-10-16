import express from "express";
import { query } from "../controllers/query.js";
import {
    DEPARTMENT_DB_URL,
    DESIGNATION_DB_URL,
    EMPLOYEE_DB_URL,
} from "../config/db-url.constant.js";

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

export default router;