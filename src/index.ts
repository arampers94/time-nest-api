import express, { Application } from "express";
import { router } from "./routes";
import cors = require("cors");
import bodyParser = require("body-parser");

const app: Application = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// register application routes
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
