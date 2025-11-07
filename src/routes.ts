import * as express from "express";
import { router as usersRouter } from "./routes/users";
import { router as teamsRouter } from "./routes/teams";
import { router as organizationsRouter } from "./routes/organizations";
import { router as timeOffEventsRouter } from "./routes/time-off-events";
import { router as authRouter } from "./routes/auth";

export const router: express.Router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/teams", teamsRouter);
router.use("/organizations", organizationsRouter);
router.use("/time-off-events", timeOffEventsRouter);
