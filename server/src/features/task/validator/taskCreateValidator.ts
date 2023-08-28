import { ZodValidator } from "@common/utils";
import { object, string } from "zod";
import { ITaskCreate } from "../model";

const taskCreateValidationSchema = object({
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

export const taskCreateValidator = new ZodValidator<ITaskCreate>(
  taskCreateValidationSchema
);
