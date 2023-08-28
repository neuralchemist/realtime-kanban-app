// mui5
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// react-router-dom
import { useParams } from "react-router-dom";
// react-hook-form
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// custom components
import {
  ErrorMessage,
  SubmitButtonCustom,
  TextAreaFieldCustom,
  TextFieldCustom,
} from "@common/components";

// custom types
import { ITaskCreate } from "@entities/task/types";
import { IProjectId } from "@common/types/routeParams";
// custom validator
import { CreateTaskValidator } from "@entities/task/validators";
// custom hooks
import { useCreateTask } from "@entities/task/hooks";
import { useToast } from "@common/hooks";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValues = {
  title: "",
  description: "",
};

export function CreateTaskForm({ setOpen }: Props) {
  // react-router-dom hook
  const { projectId } = useParams<IProjectId["projectId"]>();

  const { createTask, queryStatus } = useCreateTask(projectId || "");
  const { setToastState } = useToast();

  // react-form-hook logic
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(CreateTaskValidator),
  });

  const onSubmit = (newTask: ITaskCreate) => {
    // add to database
    createTask(newTask, {
      onSuccess: () => {
        // close modal
        setOpen(false);
        // open toast
        setToastState({ isToastOpen: true, toastMessage: "created task" });
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={(event) => void methods.handleSubmit(onSubmit)(event)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldCustom label="Title" name="title" required />
          </Grid>

          <Grid item xs={12}>
            <TextAreaFieldCustom
              label="Description"
              name="description"
              rows={4}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <SubmitButtonCustom
              label="create"
              isDisabled={queryStatus === "loading"}
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
            />
          </Grid>

          {queryStatus === "error" ? (
            <Grid item xs={12}>
              <ErrorMessage message="failed to create task" />
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </FormProvider>
  );
}
