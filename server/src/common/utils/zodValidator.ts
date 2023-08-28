import { AnyZodObject, ZodError, ZodEffects} from "zod";
import { fromZodError } from "zod-validation-error";
import { BadRequestError } from "../errors";

// https://jeffsegovia.dev/blogs/rest-api-validation-using-zod


export class ZodValidator<T>  {
  private _schema: AnyZodObject | ZodEffects<AnyZodObject>;

  constructor(schema: AnyZodObject | ZodEffects<AnyZodObject>) {
    this._schema = schema;
  }

  public validate(obj: unknown): T | undefined {
    try {
      const _obj = this._schema.parse(obj) as T;
      return _obj;
    } catch (err: any) {
      if (err instanceof ZodError) {
        const errorMessage = fromZodError(err).message;
        throw new BadRequestError(errorMessage);
      }
    }
  }
}