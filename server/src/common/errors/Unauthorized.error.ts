import CustomError from "./Custom.error";
import { StatusCodes } from "http-status-codes";

class UnauthorizedError extends CustomError {
  statusCode: number;

  // 401
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
