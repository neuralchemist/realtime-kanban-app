// react-router-dom
import { useParams } from "react-router-dom";
// custom component
import { UpdateProjectForm } from "..";
import { ProjectTop } from "./ProjectTop";
// custom styles
import { StyledProjectSection } from "./styles";
// custom types
import { IProjectId } from "@common/types/routeParams";
// custom hooks
import { useFindAllProject } from "@entities/project/hooks";

export function ProjectSection() {
  // react-router-dom hook
  const { projectId } = useParams<IProjectId["projectId"]>();

  // 📤 projects from cache / db
  const { projects, queryStatus } = useFindAllProject();

  if (queryStatus === "loading") {
    return <h1>loading projects</h1>;
  }

  if (queryStatus === "error") {
    return <h1>failed to load project</h1>;
  }

  const project = projects?.find((project) => project._id === projectId);

  if (!project) {
    return <h1>failed to load project</h1>;
  }

  return (
    <StyledProjectSection aria-label="project-section" key={project._id}>
      <ProjectTop projectId={project["_id"]} />
      <UpdateProjectForm project={project}/>
    </StyledProjectSection>
  );
}
