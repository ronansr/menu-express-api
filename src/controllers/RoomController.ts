import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";

export class RoomController {
  static async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "O nome é obrigatorio" });
    }

    try {
      const room = roomRepository.create({
        name,
      });

      await roomRepository.save(room);

      return res.status(200).json({ message: "Tudo certo", data: room });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }

    return res.json("deu tudo certo");
  }
}
