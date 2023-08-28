// mui
import Typography from "@mui/material/Typography";
// custom type
import { ITask } from "src/entities/task/types";
// custom components
import { Task } from "./Task";
// custom styles
import { StyledTaskList, StyledListHeader } from "./styles";
import { Droppable, DroppableProvided } from "@hello-pangea/dnd";

interface Props {
  taskStatus: ITask["status"];
  tasks: ITask[];
}

const sectionIcon: Record<ITask["status"], string> = {
  pending: "⏰",
  ongoing: "🍌",
  completed: "🍏",
};

export function TaskList({ taskStatus, tasks }: Props) {
  return (
    <Droppable droppableId={taskStatus} direction="vertical">
      {(provided: DroppableProvided) => (
        <StyledTaskList aria-label="task-list" ref={provided.innerRef} {...provided.droppableProps}>
          <StyledListHeader>
            <Typography variant="h6">
              {sectionIcon[taskStatus]} {taskStatus}
            </Typography>
          </StyledListHeader>

          {/* Tasks */}
          {tasks.map((task, index) => (
            <Task key={task._id} task={task} index={index} />
          ))}

          {provided.placeholder}
        </StyledTaskList>
      )}
    </Droppable>
  );
}
