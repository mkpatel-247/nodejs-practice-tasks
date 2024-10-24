import mongoose from "mongoose";
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
        name: "BA - Business Analyst",
    },
    {
        name: "Sales Executive",
    },
    {
        name: "Marketing Head",
    },
];

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
