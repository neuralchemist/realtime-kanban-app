// react-query
import { useQuery } from "@tanstack/react-query";
// custom types
import { ITask } from "../types";
import { IProject } from "@entities/project/types";
// custom api
import { TasksApi } from "../api";
// custom utils
import { TASKS_CACHENAME } from "../utils/cachename";

export function useFindTasksByProjectId(
  projectId: IProject["_id"] | undefined
) {
  // fetch function
  const queryFn = async () =>
    await TasksApi.findTasksByProjectId(projectId || "");

  const { data, status, error } = useQuery<ITask[], Error>({
    queryKey: [TASKS_CACHENAME, projectId],
    queryFn: queryFn,
  });

  return { tasks: data, queryStatus: status, error };
}
