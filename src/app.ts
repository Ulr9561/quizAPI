import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import authRouter from "./routes/auth";
import { connectDB } from "./config/database";
import appRouter from "./routes/appRouter";
import updateDb from "./utils/updateDB";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use(
    cors({
        credentials: true,
    }),
);

app.use("/api/auth", authRouter);
app.use("/api/", appRouter);

connectDB();
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
