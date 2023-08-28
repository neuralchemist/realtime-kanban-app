import { useMemo } from "react";
// react-router-dom
import { useParams } from "react-router-dom";
// drag-and-drop
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
// custom styles
import { StyledTaskBoard } from "./styles";
// custom components
import { TaskList } from "./TaskList";
// custom types
import { IStatus, ITask, ITaskUpdate } from "@entities/task/types";
import { IProjectId } from "@common/types/routeParams";
// custom hooks
import { useUpdateTask } from "@entities/task/hooks";

interface Props {
  tasks: ITask[];
}

export function TaskBoard({ tasks }: Props) {
  // react-router-dom hook
  const { projectId } = useParams<IProjectId["projectId"]>();

  const { updateTask, queryStatus } = useUpdateTask(projectId || "");

  // group tasks by status
  const tasksByStatus = useMemo(
    () =>
      tasks.reduce(
        (prev, task) => {
          prev.get(task.status)?.push(task);

          return prev;
        },
        new Map<ITask["status"], ITask[]>([
          ["pending", []],
          ["ongoing", []],
          ["completed", []],
        ])
      ),
    [tasks]
  );

  const handleDragEnd = (result: DropResult) => {
    /**
     * update status on drag end
     */
    // ---DEBUG---
    console.log(
      "%cUpdateTaskStatusContainer -> handleDragEnd",
      "color: orange"
    );
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const isHorizontalDrag = destination.droppableId !== source.droppableId;

    if (isHorizontalDrag) {
      console.log(
        `chaged status of ${draggableId} from ${source.droppableId} to ${destination.droppableId}`
      );
      const task = tasks.find((task) => task._id === draggableId);

      if (!task) return;

      const status = destination.droppableId as IStatus;

      const newTask: ITaskUpdate = { status };
      // add to database
      updateTask(task._id, newTask, {
        // onSuccess: () => {},
      });
    }
  };

  const tasksStatus: ITask["status"][] = [...tasksByStatus.keys()];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <StyledTaskBoard>
        {tasksStatus.map((status) => (
          <TaskList
            key={status}
            taskStatus={status}
            tasks={tasksByStatus.get(status) || []}
          />
        ))}
      </StyledTaskBoard>
    </DragDropContext>
  );
}
