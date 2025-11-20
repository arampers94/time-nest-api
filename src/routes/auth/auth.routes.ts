import * as express from "express";
import { signIn, signUp, signOut } from "./auth.controller";

export const router: express.Router = express.Router();

router.route("/sign-in").post(signIn);
router.route("/sign-up").post(signUp);
router.route("/sign-out").post(signOut);
