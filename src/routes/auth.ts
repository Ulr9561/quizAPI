import { login, register, user, verifyEmail } from "../controllers/authController";
import express, { Request, Response, Router } from "express";
import { checkAuthAndAccount, validateLoginRequest, validateRegisterRequest } from "../middlewares/authMiddleware";

const authRouter: Router = express.Router();

authRouter.post("/login", validateLoginRequest, login);

authRouter.post("/register", validateRegisterRequest, register);
authRouter.get("/verify/:token", verifyEmail);

authRouter.get('/user', checkAuthAndAccount, user)
export default authRouter;
