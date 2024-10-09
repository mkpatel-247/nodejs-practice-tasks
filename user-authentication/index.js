import express from "express";
import dotenv from "dotenv";
import mainRoutes from "./routes/main.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
dotenv.config();

app.use(express.json());

app.use("/", mainRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
    console.log(`API server is running on port: ${process.env.PORT || 5000}`);
});
