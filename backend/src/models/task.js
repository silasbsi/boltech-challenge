import mongoose from "../database/index.js";

const TaskSchema = new mongoose.Schema({
   description: {
      type: String,
      require: true,
   },
   projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      require: true,
   },

   createdAt: {
      type: Date,
      default: Date.now,
   },

   finishedAt: {
      type: Date,
      default: null,
   },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
