import { Model, isValidObjectId } from "mongoose";
import { ITask, ITaskUpdate } from "../model";
import { ITaskRepository } from "./interface.repository";
import { ITaskMongoDB, TaskModel, ITaskCreate } from "../model";
import { IProject } from "@features/project/model";
import { projectService } from "@features/project/service";
// custom error
import { BadRequestError, NotFoundError } from "@common/errors";

/**
 *   throw error:  will be catched by the module 'express-async-error' 
 */

export class TaskRepoMongoDB implements ITaskRepository {
  // mongodb model
  private readonly _db: Model<ITaskMongoDB> = TaskModel;

  async findAllByProjectId(projectId: IProject["_id"]): Promise<ITask[]> {
    // ✅ check  
    const project = await projectService.findById(projectId);

    // 📤 find
    const _tasks: ITaskMongoDB[] | null = await this._db.find(
      {
        projectId: projectId,
      },
      { _id: 1, title: 1, description: 1, status: 1 }
    );

    // ✅ check  
    if (!_tasks) {
      throw new NotFoundError(`no task with project id: ${projectId}`);
    }

    // 🔁 convert 
    const tasks = _tasks.map(this.convertToITask);

    return tasks;
  }

  async create(
    projectId: IProject["_id"],
    newTask: ITaskCreate
  ): Promise<ITask> {
    // ✅ check  
    await projectService.findById(projectId);

    // 📤 create
    const _task: ITaskMongoDB = await this._db.create({
      ...newTask,
      projectId: projectId,
      status: "pending",
    });

    // 🔁 convert 
    const task = this.convertToITask(_task);

    return task;
  }

  async updateById(id: ITask["_id"], newTask: ITaskUpdate): Promise<ITask> {
    // ✅ check  
    if (!isValidObjectId(id)) {
      throw new BadRequestError(`invalid mongodb id: ${id}`);
    }
    // 📤 update
    const _task: ITaskMongoDB | null = await this._db.findByIdAndUpdate(
      id,
      newTask,
      { new: true }
    );

    // ✅ check  
    if (!_task) {
      throw new NotFoundError(`no task with id: ${id}`);
    }

    // 🔁 convert 
    const task = this.convertToITask(_task);

    return task;
  }

  async deleteById(id: ITask["_id"]): Promise<ITask["_id"]> {
    // ✅ check  
    if (!isValidObjectId(id)) {
      throw new BadRequestError(`invalid mongodb id: ${id}`);
    }
    // 📤 delete
    const _task: ITaskMongoDB | null = await this._db.findByIdAndDelete(id);

    // ✅ check  
    if (!_task) {
      throw new NotFoundError(`no task with id: ${id}`);
    }

    return _task._id;
  }

  private convertToITask(task: ITaskMongoDB): ITask {
    // convert mongodb document to ITask
    const { _id, title, description, status } = task;

    return { _id: _id.toString(), title, description, status };
  }
}
