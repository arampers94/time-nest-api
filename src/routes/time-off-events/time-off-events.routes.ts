import * as express from "express";
import {
  getTimeOffEventById,
  getCurrentTimeOffEventsByTeamId,
  getFutureTimeOffEventsByTeamId,
  createTimeOffEvent,
  updateTimeOffEvent,
  deleteTimeOffEvent,
} from "./time-off-events.controller";

export const router: express.Router = express.Router();

router.route("/:id").get(getTimeOffEventById);
router
  .route("/current-time-off-events/:teamId")
  .get(getCurrentTimeOffEventsByTeamId);
router
  .route("/future-time-off-events/:teamId")
  .get(getFutureTimeOffEventsByTeamId);
router.route("/time-off-event").post(createTimeOffEvent);
router.route("/:id").put(updateTimeOffEvent);
router.route("/:id").delete(deleteTimeOffEvent);
