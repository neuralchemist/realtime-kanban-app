// msw
import { rest } from "msw";
//  mock data
import { projectsUrl, mockProjects, updateProjectsUrl } from "./projects";
import { tasksUrl, mockTasks, updateTasksUrl } from "./tasks";
import {
  IProject,
  IProjectCreate,
  IProjectUpdate,
} from "@entities/project/types";
import { ITask, ITaskCreate, ITaskUpdate } from "@entities/task/types";

export const successResponseHandler = [
  rest.get(projectsUrl, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProjects));
  }),

  rest.post<IProjectCreate>(projectsUrl, async (req, res, ctx) => {
    const { title, description } = await req.json<IProjectCreate>();

    const newProject: IProject = { _id: "4", title, description };
    console.log("--------newProject: ", newProject);
    return res(ctx.status(201), ctx.json(newProject));
  }),

  rest.patch<IProjectUpdate>(updateProjectsUrl, async (req, res, ctx) => {
    let { title, description } = await req.json<IProjectUpdate>();
    title = title || mockProjects[0].title;
    description = description || mockProjects[0].description;

    const newProject: IProject = { ...mockProjects[0], title, description };
    console.log("--------updatedProject: ", newProject);
    return res(ctx.status(200), ctx.json(newProject));
  }),

  rest.get(tasksUrl, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTasks));
  }),

  rest.post<ITaskCreate>(tasksUrl, async (req, res, ctx) => {
    const { title, description } = await req.json<ITaskCreate>();

    const newTask: ITask = { _id: "4", title, description, status: "pending" };
    console.log("--------newTask: ", newTask);
    return res(ctx.status(201), ctx.json(newTask));
  }),

  rest.patch<ITaskUpdate>(updateTasksUrl, async (req, res, ctx) => {
    let { title, description, status } = await req.json<ITaskUpdate>();
    title = title || mockTasks[0].title;
    description = description || mockTasks[0].description;
    status = status || mockTasks[0].status;

    const newTask: ITask = { ...mockTasks[0], title, description, status };
    console.log("--------updatedTask: ", newTask);

    return res(ctx.status(200), ctx.json(newTask));
  }),
];
