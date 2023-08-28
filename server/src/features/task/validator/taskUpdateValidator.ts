import { ZodValidator } from "@common/utils";
import { object, string, z } from "zod";
import { ITaskUpdate } from "../model";

const taskUpdateValidationSchema = object({
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
  status: z.enum(["pending", "ongoing", "completed"]).optional(),
}).refine((value) => value.title || value.description || value.status, {
  message: "no field provided",
});

export const taskUpdateValidator = new ZodValidator<ITaskUpdate>(
  taskUpdateValidationSchema
);
