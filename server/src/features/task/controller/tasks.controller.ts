import { NextFunction, Request, Response } from "express";
// custom service
import { taskService } from "../service";
// custom type
import { ITask, ITaskCreate, ITaskUpdate } from "../model";
import { IProject } from "@features/project/model";
import { emitCreateTask, emitUpdateTask } from "@common/utils/socketManager";

export class TasksController {
  static async findAllByProjectId(
    req: Request<{ projectId: IProject["_id"] }>,
    res: Response<ITask[]>,
    next: NextFunction
  ) {
    // note: validation in service layer
    const { projectId } = req.params;

    const tasks = await taskService.findAllByProjectId(projectId);
    res.status(200).json(tasks);
  }

  static async create(
    req: Request<{ projectId: IProject["_id"] }, {}, ITaskCreate>,
    res: Response<ITask>,
    next: NextFunction
  ) {
    const { projectId } = req.params;
    // note: validation in service layer
    const newTask = req.body;

    // create task
    const task = await taskService.create(projectId, newTask);
    // 📡 broadcast
    emitCreateTask(projectId, task);

    // redundant task
    res.status(201).json(task);
  }

  static async update(
    req: Request<
      { taskId: ITask["_id"]; projectId: IProject["_id"] },
      {},
      ITaskUpdate
    >,
    res: Response<ITask>,
    next: NextFunction
  ) {
    const { taskId, projectId } = req.params;
    // note: validation in service layer
    const newTask = req.body;

    // update task
    const task = await taskService.updateById(taskId, newTask);
    // 📡 broadcast
    emitUpdateTask(projectId, task);

    // redundant task
    res.status(200).json(task);
  }

  static async delete(
    req: Request<{ taskId: ITask["_id"] }>,
    res: Response<ITask["_id"]>,
    next: NextFunction
  ) {
    const { taskId } = req.params;

    // create task
    const task_id = await taskService.deleteById(taskId);
    res.status(200).json(task_id);
  }
}
