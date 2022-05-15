import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { connect } from "../database";
import User from "../models/User";
import { resDefaultMessage, resError } from "../utils";

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
      if (!email || !password) return resDefaultMessage(res, 400, "missingFieldsLogin");

      const user = await User.findOne({ email });
      if (!user) return resDefaultMessage(res, 400, "notFound");

      if (user.password !== password) return resDefaultMessage(res, 400, "missingFieldsLogin");

      const token = jwt.sign({ id: user.id }, key, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
        },
      });
    } catch (error) {
      return resError(res, error);
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { email, password, name, lastname, role } = req.body;

      const user = await User.findOne({ email });
      if (user) return resDefaultMessage(res, 400, "emailExists");

      const newUser = new User({
        email,
        password,
        name,
        lastname,
        role,
      });

      await newUser.save();

      return resDefaultMessage(res, 201, "success");
    } catch (error) {
      return resError(res, error);
    }
  }
}
