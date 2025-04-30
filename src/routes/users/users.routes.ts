import * as express from "express";
import { getUsersByOrganizationId, getUserById } from "./users.controller";

export const router: express.Router = express.Router();

router.route("/organization/:organizationId").get(getUsersByOrganizationId);
router.route("/user/:id").get(getUserById);
