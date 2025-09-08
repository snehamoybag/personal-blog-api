import { Router } from "express";
import authenticateUser from "../middlewares/auth/user.auth.middleware";

const login = Router();

login.post("/", authenticateUser, (req, res) => {
  res.json(req.user);
});

export default login;
