import * as express from "express";
import { login, register, logout } from "./auth.controller";

export const router: express.Router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").post(logout);
