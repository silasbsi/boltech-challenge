import mongoose from "../database/index.js";

const ProjectSchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
