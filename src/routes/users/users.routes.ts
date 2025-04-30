import * as express from "express";
import { getUsersByOrganizationId, getUserById } from "./users.controller";

export const router: express.Router = express.Router();

router.route("/by-organization-id").get(getUsersByOrganizationId);
router.route("/user").get(getUserById);
