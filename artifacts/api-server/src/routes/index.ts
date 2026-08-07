import { Router, type IRouter } from "express";
import healthRouter from "./health";
import hxaRouter from "./hxa";

const router: IRouter = Router();

router.use(healthRouter);
router.use(hxaRouter);

export default router;
