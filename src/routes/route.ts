import authRouter from "./auth/route";

import { Router } from "express";

const routers = Router();

routers.use('/auth', authRouter);

export default routers;