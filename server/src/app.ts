import express, { Application } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// custom middlewares
import { errorMiddleware, pageNotFound } from "@common/middlewares";

// custom routes
import { projectsRouter } from "@features/project/routes";
import { tasksRouter } from "@features/task/routes";


const app: Application = express();

// external middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1/projects", projectsRouter);
app.use("/api/v1/projects", tasksRouter);

// common error handler
app.use(errorMiddleware);
// 404 page not found
app.use(pageNotFound);

export default app;