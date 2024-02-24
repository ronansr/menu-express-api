import { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
  static async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new BadRequestError("Campos obrigatorios nao preenchidos");
    }

    const userExists = await userRepository.findOneBy({ email });

    if (userExists) throw new BadRequestError("Usuário já existe");

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    const { password: _, ...user } = newUser;

    await userRepository.save(newUser);

    return res.status(200).json({ message: "Tudo certo", data: user });
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Campos obrigatorios nao preenchidos");
    }

    const user = await userRepository.findOneBy({ email });

    if (!user) throw new BadRequestError("E-mail ou senha invalidos");

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) throw new BadRequestError("E-mail ou senha invalidos");

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_PASSWORD ?? "",
      { expiresIn: "8h" }
    );

    const { password: _, ...userClean } = user;

    return res
      .status(200)
      .json({ message: "Tudo certo", user: userClean, token });
  }

  static async getProfile(req: Request, res: Response) {
    return res.status(200).json(req.user);
  }
}
