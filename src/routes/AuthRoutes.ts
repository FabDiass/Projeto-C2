import { Router } from "express";

const AuthRouter = Router();

AuthRouter.post("/api/auth/signin");

AuthRouter.post("/api/auth/signup");

export default AuthRouter;
