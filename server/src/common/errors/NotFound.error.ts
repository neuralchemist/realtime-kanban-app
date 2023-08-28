import CustomError from "./Custom.error";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends CustomError {
  statusCode: number;

  // 404
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
