import employeeModel from "../models/employee.model.js";

/**
 * Get data form employee collections and fetch name from department and designation collections.
 */
export const aggregateListEmployee = async () => {
    try {
        const data = await employeeModel.aggregate([
            {
                $match: { isDeleted: false },
            },
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
