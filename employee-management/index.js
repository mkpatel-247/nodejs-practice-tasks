import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import cors from "cors";
import { isDbExists } from "./config/db.config.js";
import pageRoutes from "./routes/pages.routes.js";
import apiRoutes from "./routes/api.routes.js";

const PORT = 3000;
const app = express();
app.use(cors());

app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
        layoutsDir: path.join("views/layouts"),
        //Define all helpers.
        helpers: {
            // helpers: helpers(),
            // short: short,
            // formatPrice: price,
            // date: formatDate,
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

    res.render("error");
});
