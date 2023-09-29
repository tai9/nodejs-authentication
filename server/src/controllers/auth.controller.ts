import { Request, Response } from "express";
import { constants } from "http2";
import authService from "../services/auth.service";

const login = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json();
    }
    const credentials = await authService.login(username, password);
    return res.status(constants.HTTP_STATUS_OK).json({ ...credentials });
  } catch (err: any) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST);
    }
    const user = await authService.signUp(username, password);
    res.status(constants.HTTP_STATUS_OK).json({
      id: user.id,
      username,
    });
  } catch (err: any) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      message: err.message,
    });
  }
};

export default {
  login,
  signUp,
};
