import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import productRoutes from "./routes/product.route.js";
import helpers from "handlebars-helpers";
import { short } from "./helpers/string.helpers.js";
import { price } from "./helpers/number.helpers.js";
import { formatDate } from "./helpers/date.helpers.js";

const PORT = 8000;
const app = express();

app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
        layoutsDir: path.join("views/layouts"),
        //Define all helpers.
        helpers: {
            helpers: helpers(),
            short: short,
            formatPrice: price,
            date: formatDate,
        },
    })
);
app.set("view engine", "handlebars");
app.set("views", path.join("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join("public")));

app.use("/", productRoutes);

app.listen(PORT, () => {
    console.log(
        `Server is running on port ${PORT} \nPress ctrl + click on http://localhost:${PORT}/`
    );
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log("Uncaught exception...");

    res.render("error");
});
