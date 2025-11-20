import express, { Application } from "express";
import { router } from "./routes";
import cors = require("cors");
import bodyParser = require("body-parser");
import { createClient } from "@supabase/supabase-js";

declare global {
  namespace Express {
    interface Request {
      oidc?: any;
    }
  }
}

const { requiresAuth } = require("express-openid-connect");
const app: Application = express();
const port = 3000;

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(bodyParser.json());

// register application routes
app.use("/api", router);

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.post("/login", (req, res) => {
  res.send("Login route");
});

app.post("/logout", (req, res) => {
  res.send("Logout route");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
