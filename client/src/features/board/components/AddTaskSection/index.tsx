import { useState } from "react";
// mui
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Typography from "@mui/material/Typography";
// custom styles
import { StyledAddTask, StyledTaskAddButton } from "./styles";
// custom components
import { CreateTaskForm } from "..";
import { ModalCustom } from "@common/components";

interface Props {
  totalTasks: number;
}

export function AddTaskSection({ totalTasks }: Props) {
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const handleOpen = () => setOpenTaskModal(true);
  return (
    <>
      <StyledAddTask aria-label="add-task-section">
        <StyledTaskAddButton size="small" onClick={handleOpen}>
          <AddOutlinedIcon />
        </StyledTaskAddButton>
        <Typography variant="body2" fontWeight="700">
          {totalTasks} tasks
        </Typography>
      </StyledAddTask>

      <ModalCustom open={openTaskModal} setOpen={setOpenTaskModal}>
        <CreateTaskForm setOpen={setOpenTaskModal} />
      </ModalCustom>
    </>
  );
}
