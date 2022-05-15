import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

dotenv.config();

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.url === "/login" || req.url === "/register") return next();

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const key = process.env.SECRET_KEY;

  if (!key) throw new Error("Configurar .env");
  if (!token) return res.status(401).json({ error: "Token not provided" });

  jwt.verify(token, key, (err) => {
    if (err instanceof jwt.TokenExpiredError) return res.status(403).send({ error: "Token has expired" });
    if (err) return res.status(401).json({ error: "Token invalid" });

    next();
  });
}
