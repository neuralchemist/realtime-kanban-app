// version send to client
export interface IProject {
  _id: string;
  title: string;
  description: string;
}

// version from client when creating project
export interface IProjectCreate {
  title: string;
  description: string;
}

// version from client when updating project
export interface IProjectUpdate {
  title?: string;
  description?: string;
}
