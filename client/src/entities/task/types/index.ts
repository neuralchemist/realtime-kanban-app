export type IStatus = "pending" | "ongoing" | "completed";

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: IStatus;
}

export interface ITaskCreate {
  title: string;
  description: string;
}

export interface ITaskUpdate {
  title?: string;
  description?: string;
  status?: IStatus;
}
