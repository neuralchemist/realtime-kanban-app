import { Router } from "express";
import { ProjectController } from "../contoller";
// import { TasksController } from "@features/tasks/controller";

export const projectsRouter = Router();

// '/api/v1/projects/'
projectsRouter
  .route("/")
  .get(ProjectController.findAll)
  .post(ProjectController.create);

// '/api/v1/projects/:projectId'
projectsRouter
  .route("/:projectId")
  .patch(ProjectController.update)

