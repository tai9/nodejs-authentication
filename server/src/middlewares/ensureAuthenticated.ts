import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";

export const ensureAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split("Bearer ")[1] : "";

  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.JWT_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);

      (req as any).user = user;

      next();
    }
  );
};
