import * as express from "express";
import {
  getTeamsByOrganizationId,
  getTeamById,
  createTeam,
  updateTeamDetails,
  addTeamUsers,
  removeTeamUsers,
  deleteTeam,
} from "./teams.controller";

export const router: express.Router = express.Router();

router.route("/organization/:organizationId").get(getTeamsByOrganizationId);
router.route("/team/:id").get(getTeamById);
router.route("/team").post(createTeam);
router.route("/team/:id").put(updateTeamDetails);
router.route("/team/:id/add-users").post(addTeamUsers);
router.route("/team/:id/remove-users").put(removeTeamUsers);
router.route("/team/:id").delete(deleteTeam);
