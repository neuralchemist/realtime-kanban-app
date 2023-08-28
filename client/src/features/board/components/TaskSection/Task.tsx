import { useState } from "react";
// mui
import Typography from "@mui/material/Typography";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// custom types
import { ITask } from "@entities/task/types";
// custom styles
import { StyledTask, StyledTaskDeleteButton } from "./styles";
// custom components
import { UpdateTaskForm } from "..";
import { ModalCustom } from "@common/components";
import { Draggable } from "@hello-pangea/dnd";
// custom hook
import { useToast } from "@common/hooks";

interface Props {
  task: ITask;
  index: number;
}

export function Task({ task, index }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setToastState } = useToast();

  const handleOpen = () => setIsModalOpen(true);

  const deleteTask = (event: React.MouseEvent) => {
    // stop event bubbling
    event.stopPropagation();
    setToastState({
      isToastOpen: true,
      toastMessage: "delete task: Sorry, no can do",
    });
  };

  return (
    <>
      <Draggable draggableId={task._id} index={index} >
        {(provided, snapshot) => (
          <StyledTask
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={handleOpen}
            aria-label="task-item"
          >
            <Typography>
              {task.title === "" ? "Untitled" : task.title}
            </Typography>

            <StyledTaskDeleteButton size="small" onClick={deleteTask}>
              <DeleteOutlinedIcon />
            </StyledTaskDeleteButton>
          </StyledTask>
        )}
      </Draggable>
      <ModalCustom open={isModalOpen} setOpen={setIsModalOpen}>
        <UpdateTaskForm setIsModalOpen={setIsModalOpen} task={task} />
      </ModalCustom>
    </>
  );
}
