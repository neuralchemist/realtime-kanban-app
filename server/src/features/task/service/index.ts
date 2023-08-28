import { TaskRepoMongoDB } from "../repository/mongodb.repository";
import { TaskService } from "./task.service";

export { ITaskService } from "./interface.service";

const taskRepository = new TaskRepoMongoDB();

export const taskService = new TaskService(taskRepository);
