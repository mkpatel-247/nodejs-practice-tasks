import fs from "fs";
import {
    DB_DIR_URL,
    DEPARTMENT_DB_URL,
    DESIGNATION_DB_URL,
    EMPLOYEE_DB_URL,
    SALARY_HISTORY_DB_URL,
} from "./db-url.constant.js";

const SAMPLE_DATA_DEPARTMENT = [
    {
        departmentId: 101,
        departmentName: "Engineering",
    },
    {
        departmentId: 102,
        departmentName: "Product",
    },
    {
        departmentId: 103,
        departmentName: "Human Resources",
    },
    {
        departmentId: 104,
        departmentName: "Marketing",
    },
    {
        departmentId: 105,
        departmentName: "Sales",
    },
];
const SAMPLE_DATA_DESIGNATION = [
    {
        designationId: 1,
        designationName: "Software Engineer",
    },
    {
        designationId: 2,
        designationName: "Product Manager",
    },
    {
        designationId: 3,
        designationName: "QA Engineer",
    },
    {
        designationId: 4,
        designationName: "HR Specialist",
    },
    {
        designationId: 5,
        designationName: "UX Designer",
    },
    {
        designationId: 6,
        designationName: "BA - Business Analyst",
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
