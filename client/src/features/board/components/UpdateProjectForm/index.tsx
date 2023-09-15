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
import { IProject, IProjectUpdate } from "@entities/project/types";
// custom validator
import { UpdateProjectValidator } from "@entities/project/validators";
// custom hooks
import { useUpdateProject } from "@entities/project/hooks";
// custom styles
import { StyledButtonSection, StyledUpdateProjectForm } from "./styles";
import { useToast } from "@common/hooks";
import { useEffect } from "react";

interface Props {
  project: IProject;
}

export function UpdateProjectForm({ project }: Props) {
  const { updateProject, queryStatus } = useUpdateProject();
  const { setToastState } = useToast();

  const defaultValues = {
    title: project.title || "",
    description: project.description || "",
  };

  // react-form-hook logic
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(UpdateProjectValidator),
  });

  const onSubmit = (projectUpdate: IProjectUpdate) => {
    // add to database
    updateProject(project._id, projectUpdate, {
      onSuccess: () => {
        // open toast
        setToastState({ isToastOpen: true, toastMessage: "project updated" });
      },
    });
  };

  useEffect(() => {
    // default values won't automatically change when the project prop updates.
    // need to update the form values manually when the project prop changes.
    methods.reset({
      title: project.title || "",
      description: project.description || "",
    });
  }, [project, methods]);

  return (
    <FormProvider {...methods}>
      <StyledUpdateProjectForm
        component="form"
        onSubmit={(event) => void methods.handleSubmit(onSubmit)(event)}
        aria-label="update-project-form"
      >
        <TextFieldCustom
          name="title"
          placeholder="Title"
          sx={{
            "& .MuiOutlinedInput-input": { padding: 0 },
            "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
            "& .MuiOutlinedInput-root": {
              fontSize: "2.2rem",
              fontWeight: "700",
            },
          }}
        />
        <TextAreaFieldCustom
          name="description"
          placeholder="Description"
          sx={{
            "& .MuiOutlinedInput-input": { padding: 0 },
            "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
            "& .MuiOutlinedInput-root": { fontSize: "1.0rem" },
          }}
        />

        <StyledButtonSection>
          <SubmitButtonCustom
            label="update"
            isDisabled={queryStatus === "loading"}
            sx={{ color: "gray" }}
          />
        </StyledButtonSection>

        {queryStatus === "error" ? (
          <ErrorMessage message="failed to update project" />
        ) : null}
      </StyledUpdateProjectForm>
    </FormProvider>
  );
}
