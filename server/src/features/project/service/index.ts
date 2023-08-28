import { ProjectRepoMongoDB } from "../repository";
import { ProjectService } from "./project.service";
export { IProjectService } from "./interface.service";

const projectRepository = new ProjectRepoMongoDB();
export const projectService = new ProjectService(projectRepository);
