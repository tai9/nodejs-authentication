import { Request, Response } from "express";
import userService from "../services/user.service";
import { User } from "../entities/User";
import { constants } from "http2";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User();
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = "password";
    const userCreated = await userService.createUser(user);
    return res.status(constants.HTTP_STATUS_OK).json(userCreated);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    return res.status(constants.HTTP_STATUS_OK).json(users);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  createUser,
  getUsers,
};
