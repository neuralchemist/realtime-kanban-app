import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors";

function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // 500
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "sorry something went wrong" , err: err.message });
}

export default errorMiddleware;
