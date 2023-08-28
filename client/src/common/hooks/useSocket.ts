import { useEffect } from "react";
// react-query
import { useQueryClient } from "@tanstack/react-query";
// custom utils
import { socket } from "@common/utils/socket";
import { PROJECTS_CACHENAME } from "@entities/project/utils/cachename";
import { TASKS_CACHENAME } from "@entities/task/utils/cachename";
// custom types
import { IProject } from "@entities/project/types";
import { ITask } from "@entities/task/types";

/**
 * https://socket.io/how-to/use-with-react
 */

export function useSocket() {
  // react-query context
  const queryClient = useQueryClient();

  useEffect(() => {
    // ✅ no-op if the socket is already connected
    socket.connect();

    // check socket
    if (!socket) return undefined;

    const onConnect = () => {
      console.log("✅ connected: ", socket.id);
    };

    const onDisconnect = () => {
      console.log("❌ disconnected: ", socket.id);
    };

    const onConnectError = () => {
      console.log("❌ connection error: ", socket.id);
    };

    // Documents

    const onCreateProject = (newProject: IProject) => {
      /**
       * update react-query-cache
       */
      console.log("%cuseSocket -> OnCreateProject", "color: orange");

      const queryKey = [PROJECTS_CACHENAME];

      // current cache
      const cachedProjects = queryClient.getQueryData<IProject[]>(queryKey);

      if (cachedProjects) {
        // Check if the new project already exists in the cache
        const projectExist = cachedProjects.some(
          (project) => project._id === newProject._id
        );

        if (!projectExist) {
          // add new project to cache
          queryClient.setQueryData<IProject[]>(queryKey, [
            ...cachedProjects,
            newProject,
          ]);
        }
      } else {
        // cache is empty
        queryClient.setQueryData<IProject[]>(queryKey, [newProject]);
      }
    };

    const onCreateTask = (projectId: IProject["_id"], newTask: ITask) => {
      /**
       * update react-query-cache
       */
      console.log("%cuseSocket -> OnCreateTask", "color: orange");

      const queryKey = [TASKS_CACHENAME, projectId];

      // current cache
      const cachedTasks = queryClient.getQueryData<ITask[]>(queryKey);

      if (cachedTasks) {
        // Check if the new task already exist in cache
        const taskExist = cachedTasks.some((task) => task._id === newTask._id);

        if (!taskExist) {
          // add new task to cache
          queryClient.setQueryData<ITask[]>(queryKey, [
            ...cachedTasks,
            newTask,
          ]);
        }
      } else {
        //  cache is empty
        queryClient.setQueryData<ITask[]>(queryKey, [newTask]);
      }
    };

    const onUpdateTask = (projectId: IProject["_id"], newTask: ITask) => {
      /**
       * update react-query-cache
       */
      console.log("%cuseSocket -> OnUpdateTask", "color: orange");

      const queryKey = [TASKS_CACHENAME, projectId];

      // current cache
      let cachedTasks = queryClient.getQueryData<ITask[]>(queryKey);

      if (cachedTasks) {
        // update task in cache
        cachedTasks = cachedTasks.map((task) =>
          task._id === newTask._id ? newTask : task
        );
        queryClient.setQueryData<ITask[]>(queryKey, cachedTasks);
      }
      //  cache is empty
      else {
        queryClient.setQueryData<ITask[]>(queryKey, [newTask]);
      }
    };

    const onUpdateProject = (newProject: IProject) => {
      /**
       * update react-query-cache
       */
      console.log("%cuseSocket -> OnUpdateProject", "color: orange");

      const queryKey = [PROJECTS_CACHENAME];

      // current cache
      let cachedProjects = queryClient.getQueryData<IProject[]>(queryKey);

      if (cachedProjects) {
        // update projects in cache
        cachedProjects = cachedProjects.map((project) =>
          project._id === newProject._id ? newProject : project
        );
        queryClient.setQueryData<IProject[]>(queryKey, cachedProjects);
      }
      //  cache is empty
      else {
        queryClient.setQueryData<IProject[]>(queryKey, [newProject]);
      }
    };

    // Listeners  📶
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    // documents
    socket.on("project:create", onCreateProject);
    socket.on("project:update", onUpdateProject);
    socket.on("task:create", onCreateTask);
    socket.on("task:update", onUpdateTask);

    // ❌ disconnect on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [queryClient]);

  return { socket };
}
