import { Router } from "express";
import { RoomController } from "../controllers/RoomController";

const routes = Router();

routes.get("/", (req, res) => res.json("Tudo OK!"));
routes.post("/create", RoomController.create);

export default routes;
