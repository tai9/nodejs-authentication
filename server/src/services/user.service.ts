import { AppDataSource } from "../db";
import { User } from "../entities/User";

const createUser = async (user: User) => {
  try {
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
