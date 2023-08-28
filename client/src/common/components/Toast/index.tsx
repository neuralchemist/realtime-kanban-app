// mui 5
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// custom hook
import { useToast } from "@common/hooks";

export function Toast() {
  const { toastState, setToastState } = useToast();

  const onClose = (
    event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToastState({ isToastOpen: false, toastMessage: "" });
  };

  return (
    <Snackbar
      open={toastState.isToastOpen}
      autoHideDuration={2000}
      onClose={onClose}
    >
      <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
        {toastState.toastMessage}
      </Alert>
    </Snackbar>
  );
}
