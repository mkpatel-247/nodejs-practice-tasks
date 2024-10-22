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
                    from: "departments",
                    localField: "department",
                    foreignField: "_id",
                    as: "department_info",
                },
            },
            {
                $unwind: {
                    path: "$department_info",
                    preserveNullAndEmptyArrays: true, // Optionally include employees without departments
                },
            },
            {
                $lookup: {
                    from: "designations",
                    localField: "designation",
                    foreignField: "_id",
                    as: "designation_info",
                },
            },
            {
                $unwind: {
                    path: "$designation_info",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    joiningDate: 1,
                    gender: 1,
                    salary: 1,
                    email: 1,
                    department: {
                        $cond: {
                            if: "$department_info.name",
                            then: "$department_info.name",
                            else: "-",
                        },
                    },
                    designation: "$designation_info.name",
                },
            },
        ]);
        return data;
    } catch (error) {
        console.log("Error :>> ", error.message);
        return [];
    }
};
