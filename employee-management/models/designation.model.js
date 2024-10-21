import mongoose from "mongoose";

const designationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must provide name field."],
        unique: [true, "Designation already present into database."],
    },
});

export default mongoose.model("Designation", designationSchema);
