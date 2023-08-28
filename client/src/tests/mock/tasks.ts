import { ITask } from "@entities/task/types";

export const mockTasks: ITask[] = [
  {
    _id: "1",
    title: "task one",
    description: "task one description",
    status: "pending",
  },
  {
    _id: "2",
    title: "task two",
    description: "task two description",
    status: "ongoing",
  },

  {
    _id: "3",
    title: "task three",
    description: "task three description",
    status: "completed",
  },
];

export const tasksUrl =
  "http://localhost:5000/api/v1/projects/1/tasks";


export const updateTasksUrl =
  "http://localhost:5000/api/v1/projects/1/tasks/1";