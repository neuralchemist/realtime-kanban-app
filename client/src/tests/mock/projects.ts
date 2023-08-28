import { IProject } from "@entities/project/types";

export const mockProjects: IProject[] = [
  {
    _id: "1",
    title: "project one",
    description: "project one description",
  },
  {
    _id: "2",
    title: "project two",
    description: "project two description",
  },

  {
    _id: "3",
    title: "project three",
    description: "project three description",
  },
];

export const projectsUrl = "http://localhost:5000/api/v1/projects";
export const updateProjectsUrl = "http://localhost:5000/api/v1/projects/1";
