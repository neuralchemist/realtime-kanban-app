// mui5
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
import { IProjectCreate } from "@entities/project/types";
// custom validator
import { CreateProjectValidator } from "@entities/project/validators";
// custom hooks
import { useCreateProject } from "@entities/project/hooks";
import { useToast } from "@common/hooks";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValues = {
  title: "",
  description: "",
};

export function CreateProjectForm({ setIsModalOpen }: Props) {
  // react-form-hook logic
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(CreateProjectValidator),
  });

  // hook to create issue
  const { createProject, queryStatus } = useCreateProject();

  const { setToastState } = useToast();

  const onSubmit = (newProject: IProjectCreate) => {
    // 📤 add to database
    createProject(newProject, {
      onSuccess: () => {
        // close modal
        setIsModalOpen(false);
        // open toast
        setToastState({ isToastOpen: true, toastMessage: "created Project" });
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
              <ErrorMessage message="failed to create project" />
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </FormProvider>
  );
}
