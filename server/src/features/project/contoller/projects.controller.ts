import { NextFunction, Request, Response } from "express";
import { IProject, IProjectCreate, IProjectUpdate } from "../model";
import { projectService } from "../service";
import {
  emitCreateProject,
  emitUpdateProject,
} from "@common/utils/socketManager";

export class ProjectController {
  static async findAll(
    req: Request,
    res: Response<IProject[]>,
    next: NextFunction
  ) {
    const projects = await projectService.findAll();
    res.status(200).json(projects);
  }

  static async findById(
    req: Request<{ projectId: IProject["_id"] }>,
    res: Response<IProject>,
    next: NextFunction
  ) {
    const { projectId } = req.params;
    const project = await projectService.findById(projectId);
    res.status(200).json(project);
  }

  static async create(
    req: Request<{}, {}, IProjectCreate>,
    res: Response<IProject>,
    next: NextFunction
  ) {
    const project = req.body;
    const newProject = await projectService.create(project);
    // 📡 broadcast with websocket: http response is redundant
    emitCreateProject(newProject);
    res.status(201).json(newProject);
  }

  static async update(
    req: Request<{ projectId: IProject["_id"] }, {}, IProjectUpdate>,
    res: Response<IProject>,
    next: NextFunction
  ) {
    const { projectId } = req.params;
    // note: validation in service layer
    const newProject = req.body;

    // update project
    const updatedProject = await projectService.updateById(
      projectId,
      newProject
    );
    // 📡 broadcast with websocket: http response is redundant
    emitUpdateProject(updatedProject);
    res.status(200).json(updatedProject);
  }
}
