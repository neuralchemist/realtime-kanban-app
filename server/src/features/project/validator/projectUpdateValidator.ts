import { ZodValidator } from "@common/utils";
import { object, string } from "zod";
import { IProjectUpdate } from "../model";

const projectUpdateValidationSchema = object({
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
}).refine((value) => value.title || value.description, {
  message: "no field provided",
});
export const projectUpdateValidator = new ZodValidator<IProjectUpdate>(
  projectUpdateValidationSchema
);
