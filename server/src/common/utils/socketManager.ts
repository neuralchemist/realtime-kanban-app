// socketManager.ts
import { Server, Socket } from "socket.io";
import { log } from "./logger";
import { IProject } from "@features/project/model";
import { ITask } from "@features/task/model";

let io: Server;

export const initSocket = (socketServer: Server) => {
  io = socketServer;
  io.on("connection", (socket: Socket) => {
    log.info(`✅ New client connected, socket ID: ${socket.id}`);

    socket.on("disconnect", () => {
      socket.disconnect();
      log.info(`❌ Client disconnected, socket ID: ${socket.id}`);
    });
  });
};


export const emitCreateProject = (project: IProject) => {
  io.emit("project:create", project);
};


export const emitUpdateProject = (project: IProject) => {
  io.emit("project:update", project);
};

export const emitCreateTask = (projectId: IProject["_id"], task: ITask) => {
  io.emit("task:create", projectId, task);
};

export const emitUpdateTask = (projectId: IProject["_id"], task: ITask) => {
  io.emit("task:update", projectId, task);
};

