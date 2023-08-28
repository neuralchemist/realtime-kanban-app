// react-query
import { useQuery } from "@tanstack/react-query";
// custom api
import { ProjectsApi } from "../api";
// custom utis
import { PROJECTS_CACHENAME } from "../utils/cachename";
// custom types
import { IProject } from "../types";

/**
 * using react query to fetch all projects
 */

export function useFindAllProject() {
  // fetch function
  const queryFn = async () => await ProjectsApi.findAll();

  const { data, status, error } = useQuery<IProject[], Error>({
    queryKey: [PROJECTS_CACHENAME],
    queryFn: queryFn,
  });

  return { projects: data, queryStatus: status, error };
}
