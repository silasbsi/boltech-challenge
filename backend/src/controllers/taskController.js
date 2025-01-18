import express from "express";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

import Task from "../models/task.js";

router.use(authMiddleware);

router.post("/create", async (req, res) => {
   const { projectId, description } = req.body;
   try {
      const task = await Task.create({
         projectId,
         description,
      });

      return res.send({ task });
   } catch (err) {
      return res.status(400).send({ error: "Error creating new task" });
   }
});

router.patch("/finish", async (req, res) => {
   const { projectId, taskId } = req.body;

   try {
      const task = await Task.findOne({ projectId, _id: taskId });

      task.finishedAt = new Date();
      await task.save();

      return res.send({ task });
   } catch (err) {
      return res.status(400).send({ error: "Error finishing task" });
   }
});

router.get("/", async (req, res) => {
   const { projectId } = req.query;

   try {
      const tasks = await Task.find({ projectId: projectId });
      return res.send({ tasks });
   } catch (err) {
      return res.status(400).send({ error: "Error selecting tasks" });
   }
});

router.delete("/delete", async (req, res) => {
   const { projectId, taskId } = req.query;
   console.log("projectId", projectId);
   console.log("taskId", taskId);
   try {
      await Task.deleteOne({ projectId, _id: taskId });

      return res.send({ taskId });
   } catch (err) {
      return res.status(400).send({ error: "Error deleting task" });
   }
});

router.patch("/update", async (req, res) => {
   const { projectId, taskId, description } = req.body;

   try {
      const task = await Task.findOne({ projectId, _id: taskId });

      task.description = description;

      await task.save();

      return res.send({ task });
   } catch (err) {
      return res.status(400).send({ error: "Error updating task description" });
   }
});

const routeConfigurationTask = (app) => app.use("/tasks", router);

export default routeConfigurationTask;
