export type IStatus = "pending" | "ongoing" | "completed";

// version send to client
export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: IStatus;
}

// version from client when creating task
export interface ITaskCreate {
  title: string;
  description: string;
}
// fields that can be updated
export interface ITaskUpdate {
  title?: string;
  description?: string;
  status?: IStatus;
}
