import { hash } from "bcrypt";
import { AppDataSource } from "../config/db";
import { User } from "../entities/User";

const createUser = async (user: User) => {
  try {
    const password = await hash(user.password, 10);
    user.password = password;

    return await AppDataSource.manager.save(user);
  } catch (err) {
    throw err;
  }
};

const getUsers = async () => {
  try {
    return await AppDataSource.manager.findAndCount(User);
  } catch (err) {
    throw err;
  }
};

export default {
  createUser,
  getUsers,
};
