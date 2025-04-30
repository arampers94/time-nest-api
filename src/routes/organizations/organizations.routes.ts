import * as express from "express";
import {
  getOrganizationById,
  getOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from "./organizations.controller";

export const router: express.Router = express.Router();

router.route("/").get(getOrganizations);
router.route("/:id").get(getOrganizationById);
router.route("/").post(createOrganization);
router.route("/:id").put(updateOrganization);
router.route("/:id").delete(deleteOrganization);
