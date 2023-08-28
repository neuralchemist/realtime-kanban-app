// react-query
import { MutateOptions, useMutation, useQueryClient } from "@tanstack/react-query";
// custom types
import { ITask, ITaskUpdate } from "../types";
// custom api
import { TasksApi } from "../api";
// custom constants
import { IProject } from "@entities/project/types";
import { TASKS_CACHENAME } from "../utils/cachename";

interface IUpdateTaskById {
  task: ITaskUpdate;
  id: ITask["_id"];
}

export function useUpdateTask(projectId: IProject["_id"]) {
  // react-query context
  const queryClient = useQueryClient();
  // mutation function
  const mutationFn = async ({ task, id }: IUpdateTaskById) =>
    await TasksApi.update(task, id, projectId);

  const { mutate, status, error } = useMutation<ITask, Error, IUpdateTaskById>({
    mutationFn: mutationFn,
    onSuccess: (newTask) => {

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
    }
  });

  const updateTask = (
    id: ITask["_id"],
    task: ITaskUpdate,
    options?: MutateOptions<ITask, Error, IUpdateTaskById, unknown> | undefined
  ) => mutate({ id, task }, options);

  return {
    updateTask,
    queryStatus: status,
    error,
  };
}
