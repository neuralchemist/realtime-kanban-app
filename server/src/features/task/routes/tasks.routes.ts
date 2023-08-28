import { Router } from "express";
import { TasksController } from "../controller";

export const tasksRouter = Router();

// '/api/v1/projects/:projectId/tasks'
tasksRouter
  .route("/:projectId/tasks")
  .get(TasksController.findAllByProjectId)
  .post(TasksController.create);

// '/api/v1/projects/:projectId/tasks/:taskId'
tasksRouter
  .route("/:projectId/tasks/:taskId")
  .patch(TasksController.update)
  .delete(TasksController.delete);
