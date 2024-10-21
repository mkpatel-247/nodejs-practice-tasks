import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must provide name field."],
        unique: [true, "Department already found!"],
    },
});

export default mongoose.model("Department", departmentSchema);
