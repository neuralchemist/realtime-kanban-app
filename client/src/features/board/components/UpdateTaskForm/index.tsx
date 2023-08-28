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
import { ITask, ITaskUpdate } from "@entities/task/types";
import { IProjectId } from "@common/types/routeParams";
// custom validator
import { UpdateTaskValidator } from "@entities/task/validators";
// custom hooks
import { useUpdateTask } from "@entities/task/hooks";
// custom context
import { useToast } from "@common/hooks";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task: ITask;
}

export function UpdateTaskForm({ task, setIsModalOpen }: Props) {
  // react-router-dom hook
  const { projectId } = useParams<IProjectId["projectId"]>();
  const { updateTask, queryStatus } = useUpdateTask(projectId || "");
  const { setToastState } = useToast();

  const defaultValues: ITaskUpdate = {
    title: task.title || "",
    description: task.description || "",
  };
  // react-form-hook logic
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(UpdateTaskValidator),
  });

  const onSubmit = (newTask: ITaskUpdate) => {
    // add to database
    updateTask(task._id, newTask, {
      onSuccess: () => {
        // close modal
        setIsModalOpen(false);
        // open toast
        setToastState({ isToastOpen: true, toastMessage: "updated task" });
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
              label="update"
              isDisabled={queryStatus === "loading"}
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
            />
          </Grid>

          {queryStatus === "error" ? (
            <Grid item xs={12}>
              <ErrorMessage message="failed to update task" />
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </FormProvider>
  );
}
