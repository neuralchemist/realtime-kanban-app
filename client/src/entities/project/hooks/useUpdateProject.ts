// react-query
import {
  MutateOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
// custom types
import { IProject, IProjectUpdate } from "../types";
// custom api
import { ProjectsApi } from "../api";
import { PROJECTS_CACHENAME } from "../utils/cachename";

interface IUpdateProjectById {
  id: IProject["_id"];
  project: IProjectUpdate;
}

export function useUpdateProject() {
  // react-query context
  const queryClient = useQueryClient();
  // mutation function
  const mutationFn = async ({ id, project }: IUpdateProjectById) =>
    await ProjectsApi.update(id, project);

  const { mutate, status, error } = useMutation<
    IProject,
    Error,
    IUpdateProjectById
  >({
    mutationFn: mutationFn,
    onSuccess: (newProject) => {
      // react-query context
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
    },
  });
  
  // import { QueryKey, UseQueryOptions, UseQueryResult } from "react-query";
  // import { Auth, AuthError, NextOrObserver, User } from "firebase/auth";
  // options: Omit<UseQueryOptions<User, AuthError, R>, "queryFn"> = {}
  const updateProject = (
    id: IProject["_id"],
    project: IProjectUpdate,

    options?:
      | MutateOptions<IProject, Error, IUpdateProjectById, unknown>
      | undefined
  ) => mutate({ id, project }, options);

  return {
    updateProject,
    queryStatus: status,
    error,
  };
}
