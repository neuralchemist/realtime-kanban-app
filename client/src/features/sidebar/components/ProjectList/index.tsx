// custom component
import { ProjectItem } from "./ProjectItem";
// custom hooks
import { useFindAllProject } from "@entities/project/hooks";
// custom styles
import { StyledList } from "./styles";

export function ProjectList() {
  const { projects, queryStatus } = useFindAllProject();

  if (queryStatus === "loading") {
    return <h1>loading projects</h1>;
  }

  if (queryStatus === "error") {
    return <h1>failed to load projects</h1>;
  }
  return (
    <StyledList>
      {projects?.map(({ _id, title }) => (
        <ProjectItem
          key={_id}
          projectId={_id}
          title={title}
          // icon={icon}
        />
      ))}
    </StyledList>
  );
}
