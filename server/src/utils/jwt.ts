import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRATION || 15 * 60, //15m
  });
};
