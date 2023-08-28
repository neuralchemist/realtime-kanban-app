// mui
import Divider from "@mui/material/Divider";
// react-router-dom
import { useParams } from "react-router-dom";
// custom styles
import { StyledTaskSection } from "./styles";
// custom components
import { AddTaskSection } from "../AddTaskSection";
// custom types
import { IProjectId } from "@common/types/routeParams";
import { TaskBoard } from "./TaskBoard";
// custom hooks
import { useFindTasksByProjectId } from "@entities/task/hooks";

export function TaskSection() {
  // react-router-dom hook
  const { projectId } = useParams<IProjectId["projectId"]>();

  const { tasks, queryStatus } = useFindTasksByProjectId(projectId);

  // if (queryStatus === "loading") {
  //   return <h1>loading tasks</h1>;
  // }

  if (queryStatus === "error") {
    return <h1>failed to load tasks</h1>;
  }

  return (
    <StyledTaskSection aria-label="task-section">
      <AddTaskSection totalTasks={tasks?.length || 0} />

      <Divider sx={{ margin: "8px 0" }} />
      <TaskBoard tasks={tasks || []} />
    </StyledTaskSection>
  );
}
