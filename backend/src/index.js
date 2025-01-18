import express from "express";
import bodyParser from "body-parser";
import routerSettings from "./controllers/authController.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routerSettings(app);

app.listen(3000);
