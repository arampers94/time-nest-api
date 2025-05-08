import * as express from "express";
import {
  getTimeOffEventById,
  getCurrentTimeOffEventsByTeamId,
  getFutureTimeOffEventsByTeamId,
  getTimeOffEventsByMonthAndYearByTeamId,
  createTimeOffEvent,
  updateTimeOffEvent,
  deleteTimeOffEvent,
} from "./time-off-events.controller";

export const router: express.Router = express.Router();

router.route("/:id").get(getTimeOffEventById);
router.route("/current/:teamId").get(getCurrentTimeOffEventsByTeamId);
router.route("/future/:teamId").get(getFutureTimeOffEventsByTeamId);
router
  .route("/month-and-year/:teamId")
  .get(getTimeOffEventsByMonthAndYearByTeamId);
router.route("/").post(createTimeOffEvent);
router.route("/:id").put(updateTimeOffEvent);
router.route("/:id").delete(deleteTimeOffEvent);
