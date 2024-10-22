import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Must provide name field."] },
        email: {
            type: String,
            required: [true, "Must provide email field."],
            unique: [true, "Email already exists."],
        },
        joiningDate: {
            type: String,
            required: [true, "Must provide joining date field."],
        },
        department: {
            type: mongoose.Types.ObjectId,
            ref: "department",
            required: [true, "Must select department field."],
        },
        designation: {
            type: mongoose.Types.ObjectId,
            ref: "designation",
            required: [true, "Must select designation field."],
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Others"],
            required: [true, "Must select gender field."],
        },
        salary: {
            type: Number,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
