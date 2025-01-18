import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
   const { email } = req.body;
   try {
      if (await User.findOne({ email }))
         return res.status(400).send({ error: "User already exists" });

      const user = await User.create(req.body);

      user.password = undefined;

      return res.send({ user });
   } catch (error) {
      return res.status(400).send({ error: "Registration failed" });
   }
});

export default function routerSettings(app) {
   app.use("/auth", router);
}
