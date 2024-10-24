import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { connectDB } from "./config/db.config.js";
import { compareObjectId } from "./helpers/common.helper.js";
import helpers from "handlebars-helpers";
import { formatDate, formatIndex } from "./helpers/format.helper.js";
import employeeRoutes from "./routes/employee.routes.js";
import salaryRoutes from "./routes/salary.routes.js";

const PORT = 3000;
const app = express();

app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
        layoutsDir: path.join("views/layouts"),
        //Define all helpers.
        helpers: {
            helpers: helpers(),
            date: formatDate,
            index: formatIndex,
            compareId: compareObjectId,
        },
    })
);
app.set("view engine", "handlebars");
app.set("views", path.join("./views"));
// isDbExists();
await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join("public")));

app.use("/", employeeRoutes);
app.use("/api", salaryRoutes);

app.listen(process.env.PORT || PORT, () => {
    console.log(
        `Server is running on port ${PORT} \nPress ctrl + click on http://localhost:${PORT}/`
    );
    console.log("-----------------------------------");
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log("Uncaught exception...", err.message);

    // res.render("error");
});
