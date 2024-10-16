import path from "path";

export const DB_DIR_URL = path.join("db");
export const EMPLOYEE_DB_URL = path.join(DB_DIR_URL, "employee.data.json");
export const DEPARTMENT_DB_URL = path.join(DB_DIR_URL, "department.data.json");
export const DESIGNATION_DB_URL = path.join(
    DB_DIR_URL,
    "designation.data.json"
);
export const SALARY_HISTORY_DB_URL = path.join(
    DB_DIR_URL,
    "salary_history.json"
);
