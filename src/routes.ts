import * as express from "express";
import { router as usersRouter } from "./routes/users";
import { router as teamsRouter } from "./routes/teams";

export const router: express.Router = express.Router();

router.use("/users", usersRouter);
router.use("/teams", teamsRouter);
