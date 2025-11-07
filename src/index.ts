import express, { Application } from "express";
import { router } from "./routes";
import cors = require("cors");
import bodyParser = require("body-parser");

declare global {
  namespace Express {
    interface Request {
      oidc?: any;
    }
  }
}

const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");
const app: Application = express();
const port = 3000;
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

app.use(cors());
app.use(bodyParser.json());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

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
