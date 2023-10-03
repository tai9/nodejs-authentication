import { AppDataSource } from "../config/db";
import { User } from "../entities/User";
import { compare } from "bcrypt";
import { generateAccessToken } from "../utils/jwt";
import userService from "./user.service";

const login = async (username: string, password: string) => {
  try {
    const user = await AppDataSource.getRepository(User).findOneBy({
      username,
    });
    const ok = await compare(password, user.password);
    console.log("ok", ok);

    if (!ok) {
      throw new Error("Invalid username or password");
    }

    const accessToken = generateAccessToken({ username });

    return {
      username,
      accessToken,
    };
  } catch (err) {
    throw err;
  }
};

const signUp = async (username: string, password: string) => {
  try {
    const user = await AppDataSource.getRepository(User).findOneBy({
      username,
    });
    if (user) {
      throw new Error("User already existed");
    }
    const newUser = new User();
    newUser.username = username;
    newUser.password = password;
    const userCreated = await userService.createUser(newUser);
    return { id: userCreated.id, username: userCreated.username };
  } catch (err) {
    throw err;
  }
};

export default {
  login,
  signUp,
};
