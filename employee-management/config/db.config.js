import mongoose from "mongoose";
import fs from "fs";
import {
    DB_DIR_URL,
    DEPARTMENT_DB_URL,
    DESIGNATION_DB_URL,
    EMPLOYEE_DB_URL,
    SALARY_HISTORY_DB_URL,
} from "./db-url.constant.js";
import designationModel from "../models/designation.model.js";
import departmentModel from "../models/department.model.js";

const SAMPLE_DATA_DEPARTMENT = [
    {
        name: "Engineering",
    },
    {
        name: "Product",
    },
    {
        name: "Human Resources",
    },
    {
        name: "Marketing",
    },
    {
        name: "Sales",
    },
];
const SAMPLE_DATA_DESIGNATION = [
    {
        name: "Software Engineer",
    },
    {
        name: "Product Manager",
    },
    {
        name: "QA Engineer",
    },
    {
        name: "HR Specialist",
    },
    {
        name: "UX Designer",
    },
    {
        name: "BA - Business Analyst",
    },
];

const checkDir = () => {
    if (!fs.existsSync(DB_DIR_URL)) {
        fs.mkdirSync(DB_DIR_URL);
    }
};

const checkEmployeeData = () => {
    if (!fs.existsSync(EMPLOYEE_DB_URL)) {
        fs.writeFileSync(EMPLOYEE_DB_URL, JSON.stringify([]));
    }
};

const checkDepartmentData = () => {
    if (!fs.existsSync(DEPARTMENT_DB_URL)) {
        fs.writeFileSync(
            DEPARTMENT_DB_URL,
            JSON.stringify(SAMPLE_DATA_DEPARTMENT)
        );
    }
};

const checkDesignationData = () => {
    if (!fs.existsSync(DESIGNATION_DB_URL)) {
        fs.writeFileSync(
            DESIGNATION_DB_URL,
            JSON.stringify(SAMPLE_DATA_DESIGNATION)
        );
    }
};

const checkSalaryHistoryData = () => {
    if (!fs.existsSync(SALARY_HISTORY_DB_URL)) {
        fs.writeFileSync(SALARY_HISTORY_DB_URL, JSON.stringify([]));
    }
};

export const isDbExists = () => {
    checkDir();
    checkEmployeeData();
    checkDepartmentData();
    checkDesignationData();
    checkSalaryHistoryData();
};

export const connectDB = () => {
    return mongoose
        .connect("mongodb://admin:admin@localhost:27099/admin")
        .then(() => {
            console.log("Database connected successfully...!");
            departmentModel
                .create(SAMPLE_DATA_DEPARTMENT)
                .then(() => {
                    console.log("Departments created and data inserted.");
                })
                .catch(() => {
                    console.log("Departments data already present.");
                })
                .finally(() => {
                    console.log("-----------------------------------");
                });
            designationModel
                .create(SAMPLE_DATA_DESIGNATION)
                .then(() => {
                    console.log("Designations created and data inserted.");
                })
                .catch(() => {
                    console.log("Designations data already present.");
                })
                .finally(() => {
                    console.log("-----------------------------------");
                });
        })
        .catch((err) => {
            console.log("Error :>> ", err.message);
        });
};
