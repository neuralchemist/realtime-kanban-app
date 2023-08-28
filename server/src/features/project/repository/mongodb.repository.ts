import { Model, isValidObjectId } from "mongoose";
import {
  IProject,
  IProjectCreate,
  IProjectMongoDB,
  IProjectUpdate,
  ProjectModel,
} from "../model";
// custom repository
import { IProjectRepository } from "./interface.repository";
// custom error
import { BadRequestError, NotFoundError } from "@common/errors";

/**
 *   throw error:  will be catched by the module 'express-async-error' 
 */

export class ProjectRepoMongoDB implements IProjectRepository {
  // mongodb model
  private readonly _db: Model<IProjectMongoDB> = ProjectModel;

  async findAll(): Promise<IProject[]> {
    // 📤 find
    const _projects = await this._db.find(
      {},
      { _id: 1, title: 1, description: 1 }
    );

    // 🔁 convert 
    const projects = _projects.map(this.convertToIProject);

    return projects;
  }

  async findById(id: IProject["_id"]): Promise<IProject> {
    // ✅ check  
    if (!isValidObjectId(id)) {
      throw new BadRequestError(`invalid mongodb id: ${id}`);
    }
    // 📤 find
    const _project: IProjectMongoDB | null = await this._db.findById(id, {
      _id: 1,
      title: 1,
      description: 1,
    });

    // ✅ check  
    if (!_project) {
      throw new NotFoundError(`no project with id: ${id}`);
    }
    // 🔁 convert 
    const project = this.convertToIProject(_project);

    return project;
  }

  async create(newProject: IProjectCreate): Promise<IProject> {
    // 📤 create
    const _project = await this._db.create(newProject);

    // 🔁 convert 
    const project = this.convertToIProject(_project);

    return project;
  }


  async updateById(id: string, newProject: IProjectUpdate): Promise<IProject> {
    // ✅ check  
    if (!isValidObjectId(id)) {
      throw new BadRequestError(`invalid mongodb id: ${id}`);
    }

    // 📤 update
    const _project: IProjectMongoDB | null = await this._db.findByIdAndUpdate(
      id,
      newProject,
      { new: true }
    );

    // ✅ check  
    if (!_project) {
      throw new NotFoundError(`no project with id: ${id}`);
    }

    // 🔁 convert 
    const project = this.convertToIProject(_project);

    return project;
  }


  async deleteById(id: string): Promise<IProject["_id"]> {
    throw new Error("Method not implemented.");
  }

  private convertToIProject(project: IProjectMongoDB): IProject {
    // convert mongodb document to IProject
    const { _id, title, description } = project;
    return { _id: _id.toString(), title, description };
  }
}
