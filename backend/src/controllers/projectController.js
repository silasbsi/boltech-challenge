import express from "express";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", (req, res) => {
   res.send({ ok: true, user: req.userId });
});

const routeConfigurationProject = (app) => app.use("/projects", router);

export default routeConfigurationProject;
