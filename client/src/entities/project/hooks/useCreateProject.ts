// react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";
// custom types
import { IProject, IProjectCreate } from "../types";
// custom api
import { ProjectsApi } from "../api";
// custom utils
import { PROJECTS_CACHENAME } from "../utils/cachename";

export function useCreateProject() {
  // react-query context
  const queryClient = useQueryClient();
  // fetch function
  const mutationFn = async (project: IProjectCreate) =>
    await ProjectsApi.create(project);

  const { mutate, status, error } = useMutation<
    IProject,
    Error,
    IProjectCreate
  >({
    mutationFn: mutationFn,
    onSuccess: (newProject) => {
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
    },


  });

  return {
    createProject: mutate,
    queryStatus: status,
    error,
  };
}
