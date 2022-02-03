import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { connect } from "../database";
import { resDefaultMessage, resError } from "../utils";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

export default class UserController {
  constructor() {
    connect();
  }

  async login(req: Request, res: Response) {
    const key = process.env.SECRET_KEY;
    if (!key) throw new Error("Configurar .env");

    try {
      const { email, password } = req.body;
      if (!email || !password)
        return resDefaultMessage(res, 400, "missingFieldsLogin");

      const user = await User.findOne({ email });

      if (user?.password !== password)
        return resDefaultMessage(res, 400, "missingFieldsLogin");

      const token = jwt.sign({ id: user?.id }, key, {
        expiresIn: "1h",
      });

      return res.status(200).json(token);
    } catch (error) {
      return resError(res, error);
    }
  }
}
