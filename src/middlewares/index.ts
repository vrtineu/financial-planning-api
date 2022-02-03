import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.url === "/login") return next();
  
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const key = process.env.SECRET_KEY;
  if (!key) throw new Error("Configurar .env");

  if (!token) return res.status(401).json({ error: "Token not provided" });

  jwt.verify(token, key, (err, user) => {
    if (err) return res.status(401).json({ error: "Token invalid" });

    req.user = user;
    next();
  });
}
