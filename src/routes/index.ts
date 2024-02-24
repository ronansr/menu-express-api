import { Router } from "express";
import { RoomController } from "../controllers/RoomController";
import { NotFoundError } from "../helpers/api-errors";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = Router();

routes.get("/", async (req, res) => {
  throw new NotFoundError("Nao achei...");
});

routes.post("/create", RoomController.create);
routes.post("/register-user", UserController.create);
routes.post("/login", UserController.login);

routes.use(authMiddleware);
// todas as rotas abaixo estao protegidas e possuem os dados do usuario no req
routes.get("/logged-user", UserController.getProfile);

export default routes;
