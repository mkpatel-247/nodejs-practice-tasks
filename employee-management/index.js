import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { isDbExists } from "./config/db.config.js";
import pageRoutes from "./routes/pages.routes.js";
import apiRoutes from "./routes/api.routes.js";
import { searchNameField } from "./helpers/findName.helper.js";
import helpers from "handlebars-helpers";
import { formatDate, formatIndex } from "./helpers/format.helper.js";

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
            findName: searchNameField,
            date: formatDate,
            index: formatIndex,
        },
    })
);
app.set("view engine", "handlebars");
app.set("views", path.join("./views"));
isDbExists();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join("public")));

app.use("/", pageRoutes);
app.use("/api", apiRoutes);

app.listen(process.env.PORT || PORT, () => {
    console.log(
        `Server is running on port ${PORT} \nPress ctrl + click on http://localhost:${PORT}/`
    );
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log("Uncaught exception...");

    // res.render("error");
});
