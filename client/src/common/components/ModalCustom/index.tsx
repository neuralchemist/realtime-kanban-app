import React from "react";
// mui
import Modal from "@mui/material/Modal";
// custom styles
import { StyledModalContent } from "./styles";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export function ModalCustom({ open, setOpen, children }: Props) {
  const handleClose = () => setOpen(false);

  return (
    <Modal aria-label="modal" open={open} onClose={handleClose}>
      <StyledModalContent>{children}</StyledModalContent>
    </Modal>
  );
}
