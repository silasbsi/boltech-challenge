import express from "express";
import authMiddleware from "../middlewares/auth.js";
import Project from "../models/project.js";
import Task from "../models/task.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/create", async (req, res) => {
   try {
      const project = await Project.create({ ...req.body, userId: req.userId });

      return res.send({ project });
   } catch (err) {
      return res.status(400).send({ error: "Error: creating new project" });
   }
});

router.patch("/update", async (req, res) => {
   const { projectId, projectTitle } = req.body;

   try {
      const project = await Project.findOne({ _id: projectId });

      project.name = projectTitle;

      await project.save();

      return res.send({ project });
   } catch (err) {
      return res.status(400).send({ error: "Error updating project" });
   }
});

router.get("/", async (req, res) => {
   try {
      const projects = await Project.find({ userId: req.userId });

      return res.send({ projects });
   } catch (err) {
      return res.status(400).send({ error: "Error selecting p  roject" });
   }
});

router.delete("/delete", async (req, res) => {
   const { projectId } = req.body;

   try {
      await Project.findByIdAndDelete(projectId);
      await Task.deleteOne({ projectId });

      return res.send({ projectId });
   } catch (err) {
      return res.status(400).send({ error: "Error deleting project" });
   }
});

const routeConfigurationProject = (app) => app.use("/projects", router);

export default routeConfigurationProject;
