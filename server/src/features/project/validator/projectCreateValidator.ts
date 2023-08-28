import { ZodValidator } from "@common/utils";
import { object, string } from "zod";
import { IProjectCreate } from "../model";

const projectCreateValidationSchema = object({
  title: string({
    invalid_type_error: "must be of type string",
  })
    .nonempty("required")
    .max(20, "too long"),

  description: string({
    invalid_type_error: "must be of type string",
  })
    .nonempty("required")
    .max(100, "too long"),
});

export const projectCreateValidator = new ZodValidator<IProjectCreate>(
  projectCreateValidationSchema
);
