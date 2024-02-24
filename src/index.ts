import "express-async-errors";
import express from "express";

import { AppDataSource } from "./database/data-source";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    const app = express();

    app.use(express.json());

    app.use(routes);

    app.use(errorMiddleware);

    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
