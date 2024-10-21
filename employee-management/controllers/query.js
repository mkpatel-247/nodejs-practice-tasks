import fs from "fs";
import employeeModel from "../models/employee.model.js";

/**
 * Query function to read data from file.
 */
export const query = {
    findAll: function (db_url) {
        try {
            const dbData = fs.readFileSync(db_url);
            return JSON.parse(dbData);
        } catch (error) {
            console.log("Error in findAll() :>> ", error.message);
            return [];
        }
    },
    findOne: function (db_url, id) {
        try {
            const dbData = fs.readFileSync(db_url);
            const jsonData = JSON.parse(dbData);

            const detail = jsonData.find((item) => item.id == id);
            const index = jsonData.findIndex((item) => item.id == id);

            return { detail, index };
        } catch (error) {
            console.log("Error in findAll() :>> ", error.message);
            return {};
        }
    },
};

/**
 * Insert new data into file.
 */
export const writeFile = (db_url, data) => {
    try {
        fs.writeFileSync(db_url, JSON.stringify(data));
        return true;
    } catch (error) {
        console.log(`Error while writing ${db_url}`);
        return false;
    }
};

export const aggregateListEmployee = async () => {
    try {
        const data = await employeeModel.aggregate([
            {
                $lookup: {
                    from: "departments", // The collection to join
                    localField: "department", // The field from the employee collection
                    foreignField: "_id", // The field from the departments collection
                    as: "department_info", // The name for the output array
                },
            },
            {
                $unwind: {
                    // Unwind the department_info array
                    path: "$department_info",
                    preserveNullAndEmptyArrays: true, // Optional: If you want to keep employees without a department
                },
            },
            {
                $lookup: {
                    from: "designations", // The collection to join
                    localField: "designation", // The field from the employee collection
                    foreignField: "_id", // The field from the departments collection
                    as: "designation_info", // The name for the output array
                },
            },
            {
                $unwind: {
                    // Unwind the department_info array
                    path: "$designation_info",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: 1, // Include _id
                    name: 1, // Include name
                    joiningDate: 1, // Include joiningDate
                    gender: 1, // Include gender
                    salary: 1, // Include salary
                    email: 1,
                    department: "$department_info.name", // Extract the name from department_info
                    designation: "$designation_info.name", // Extract the name from department_info
                },
            },
        ]);

        console.log("-----------------------------------", data);
        return data; // Return the aggregated result directly
        // return query;
    } catch (error) {
        console.log("Error :>> ", error.message);
        return [];
    }
};
