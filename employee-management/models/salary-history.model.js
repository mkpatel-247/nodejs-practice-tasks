import mongoose from "mongoose";

const salaryHistorySchema = new mongoose.Schema(
    {
        empId: {
            type: mongoose.Types.ObjectId,
            ref: "Employees",
            required: [true, "Must provide employee id."],
        },
        salary: {
            type: Number,
            required: [true, "Salary must be provided."],
        },
        month: {
            type: Number,
            required: [true, "Month must be provided"],
        },
        year: {
            type: Number,
            required: [true, "Year must be provided"],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Salary-histories", salaryHistorySchema);
