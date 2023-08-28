import CustomError from "./Custom.error";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends CustomError {
  // 400
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
