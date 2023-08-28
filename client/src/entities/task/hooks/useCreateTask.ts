// react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";
// custom types
import { ITask, ITaskCreate } from "../types";
import { IProject } from "@entities/project/types";
// custom api
import { TasksApi } from "../api";
// custom utils
import { TASKS_CACHENAME } from "../utils/cachename";

export function useCreateTask(projectId: IProject["_id"]) {
  // react-query context
  const queryClient = useQueryClient();
  // fetch function
  const mutationFn = async (task: ITaskCreate) =>
    await TasksApi.create(task, projectId);

  const { mutate, status, error } = useMutation<ITask, Error, ITaskCreate>({
    mutationFn: mutationFn,
    onSuccess: (newTask) => {
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
    },
  });

  return {
    createTask: mutate,
    queryStatus: status,
    error,
  };
}
