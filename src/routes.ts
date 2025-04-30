import * as express from "express";
import { router as usersRouter } from "./routes/users";

export const router: express.Router = express.Router();

router.use("/users", usersRouter);
