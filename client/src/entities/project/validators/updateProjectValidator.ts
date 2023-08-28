import { object, string } from "zod";

export const UpdateProjectValidator = object({
  title: string({
    invalid_type_error: "must be of type string",
  })
    .nonempty("required")
    .max(20, "too long")
    .optional(),

  description: string({
    invalid_type_error: "must be of type string",
  })
    .nonempty("required")
    .max(100, "too long")
    .optional(),
});
