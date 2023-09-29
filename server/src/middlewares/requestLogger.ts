import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import logger from "../utils/logger";

const resDotJsonInterceptor =
  (req: Request, res: Response, json: any) => (content: any) => {
    // @ts-ignore
    res.contentBody = content;
    const endTime = new Date().getTime();
    logger.info("HTTP Request Resolved", {
      method: req.method,
      // @ts-ignore
      duration: endTime - req.startTime,
      path: req.path,
      // @ts-ignore
      // requestId: res.requestId,
      // header: req.headers,
      data: { ...req.body, ...req.query },
    });
    res.json = json;
    res.json(content);
  };

export async function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.path === "/ping") return next();
  const requestId = uuidv4();
  // @ts-ignore
  req.startTime = new Date().getTime();
  // @ts-ignore
  res.requestId = requestId;
  logger.info("HTTP Request Coming", {
    method: req.method,
    path: req.path,
    // requestId: requestId,
    // header: req.headers,
    data: { ...req.body, ...req.query },
  });
  // @ts-ignore
  res.json = resDotJsonInterceptor(req, res, res.json);

  next();
}
