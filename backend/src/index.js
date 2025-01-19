import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import routeConfigurationAuth from "./controllers/authController.js";
import routeConfigurationProject from "./controllers/projectController.js";
import routeConfigurationTask from "./controllers/taskController.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routeConfigurationAuth(app);
routeConfigurationProject(app);
routeConfigurationTask(app);

app.listen(3000);
