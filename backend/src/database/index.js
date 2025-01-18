import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/boltech", {});
mongoose.Promise = global.Promise;

export default mongoose;
