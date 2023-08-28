import { threadId } from "worker_threads";
import { ITask, ITaskCreate, ITaskUpdate } from "../model";
import { ITaskRepository } from "../repository";
import { ITaskService } from "./interface.service";
import { IProject } from "@features/project/model";
import { taskCreateValidator, taskUpdateValidator } from "../validator";
import { BadRequestError } from "@common/errors";
// import { emitCreateTask} from "@common/utils";

/**
 * try-catch: handled by "express-async-errors".
 */

export class TaskService implements ITaskService {
  private readonly repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  async findAllByProjectId(projectId: IProject["_id"]): Promise<ITask[]> {
    return await this.repository.findAllByProjectId(projectId);
  }

  async create(projectId: IProject["_id"], task: ITaskCreate): Promise<ITask> {
    // ✅ validate  
    const _task = taskCreateValidator.validate(task) as ITaskCreate;

    const newTask = await this.repository.create(projectId, _task);

    // 📡 websocket
    // emitCreateTask(projectId, newTask);

    return newTask;
  }

  async updateById(id: string, newTask: ITaskUpdate): Promise<ITask> {
    // ✅ validate  
    const _task = taskUpdateValidator.validate(newTask) as ITaskUpdate;

    return await this.repository.updateById(id, _task);
  }

  async deleteById(id: ITask["_id"]): Promise<string> {
    return await this.repository.deleteById(id);
  }
}
