import { IProject, IProjectCreate, IProjectUpdate } from "../model";
import { IProjectService } from "./interface.service";
import { IProjectRepository } from "../repository";
import { projectCreateValidator, projectUpdateValidator } from "../validator";
import { BadRequestError } from "@common/errors";
// import { emitCreateProject } from "@common/utils";

/**
 * try-catch: handled by "express-async-errors".
 */

export class ProjectService implements IProjectService {
  private readonly _repo: IProjectRepository;

  constructor(repo: IProjectRepository) {
    this._repo = repo;
  }

  findAll(): Promise<IProject[]> {
    return this._repo.findAll();
  }

  findById(id: string): Promise<IProject> {
    return this._repo.findById(id);
  }

  async create(project: IProjectCreate): Promise<IProject> {
    // ✅ validate
    const _project = projectCreateValidator.validate(project) as IProjectCreate;


    const newProject = await this._repo.create(_project);


    return newProject;
  }

  updateById(id: string, project: IProjectUpdate): Promise<IProject> {
    // ✅ validate
    const _project = projectUpdateValidator.validate(project) as IProjectUpdate;

    return this._repo.updateById(id, _project);
  }

  deleteById(id: IProject["_id"]): Promise<IProject["_id"]> {
    return this._repo.deleteById(id);
  }
}
