import jwt from "jsonwebtoken/index.js";
import authConfig from "../config/index.js";

const authMiddleware = (req, res, next) => {
   const authHeader = req.headers.authorization;

   if (!authHeader) return res.status(401).send({ erro: "No token provided" });

   const parts = authHeader.split(" ");

   if (!parts.length === 2)
      return res.status(401).send({ error: "Token error" });

   const [scheme, token] = parts;

   if (!/^Bearer$/i.test(scheme))
      return res.status(401).send({ error: "Incorrectly formatted token " });

   jwt.verify(token, authConfig.secret, (error, decoded) => {
      if (error) return res.status(401).send({ error: "Invalid token" });

      req.userId = decoded.id;

      return next();
   });
};

export default authMiddleware;
