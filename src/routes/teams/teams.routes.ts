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
router.route("/:id").get(getTeamById);
router.route("/").post(createTeam);
router.route("/:id/details").put(updateTeamDetails);
router.route("/:id/add-users").put(addTeamUsers);
router.route("/:id/remove-users").put(removeTeamUsers);
router.route("/:id").delete(deleteTeam);
