import designationModel from "../models/designation.model.js";
import departmentModel from "../models/department.model.js";

export const searchNameField = async (dbName, id) => {
    switch (dbName) {
        case "designation":
            const des = await designationModel.findById(id);
            console.log("🚀 ~ searchNameField ~ des:", des.name);
            return des.name;
        case "department":
            return await departmentModel.findById(id);
        default:
            return "-";
    }
};
