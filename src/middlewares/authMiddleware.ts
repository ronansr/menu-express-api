import { NextFunction, Request, Response } from "express";

import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: number;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) throw new UnauthorizedError("Nao autorizado");

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(
    token,
    process.env.JWT_PASSWORD ?? ""
  ) as JwtPayload;

  const loggedUser = await userRepository.findOneBy({ id });

  if (!loggedUser) throw new BadRequestError("Usuário não existe");

  const { password: _, ...userClean } = loggedUser;

  req.user = userClean;

  next();
};
