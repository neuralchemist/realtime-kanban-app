import { useState } from "react";
// mui
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Typography from "@mui/material/Typography";
// custom style
import { StyledAddProject, StyledAddProjectButton } from "./styles";
// custom component
import { ModalCustom } from "@common/components";
import { CreateProjectForm } from "..";

export function AddProjectSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);

  return (
    <>
      <StyledAddProject aria-label="add-project-section">
        <Typography variant="body2" fontWeight="700">
          Projects
        </Typography>
        <StyledAddProjectButton onClick={handleOpen}>
          <AddOutlinedIcon fontSize="small" />
        </StyledAddProjectButton>
      </StyledAddProject>
      {/* modal */}
      <ModalCustom open={isModalOpen} setOpen={setIsModalOpen}>
        <CreateProjectForm setIsModalOpen={setIsModalOpen} />
      </ModalCustom>
    </>
  );
}
