import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes"


// 404 error
function pageNotFound(req: Request, res: Response, next: NextFunction) {
  return res.status(StatusCodes.NOT_FOUND).json({ message: "page not found" });
}

export default pageNotFound;