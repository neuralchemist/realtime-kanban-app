import CustomError from "./Custom.error";
import { StatusCodes } from "http-status-codes";

class ForbiddenError extends CustomError {
  statusCode: number;

  // 403
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default ForbiddenError;
