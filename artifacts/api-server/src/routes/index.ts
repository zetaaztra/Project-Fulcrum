import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import entrepreneursRouter from "./entrepreneurs";
import buildersRouter from "./builders";
import schemesRouter from "./schemes";
import documentsRouter from "./documents";
import applicationsRouter from "./applications";
import messagesRouter from "./messages";
import journeyRouter from "./journey";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(entrepreneursRouter);
router.use(buildersRouter);
router.use(schemesRouter);
router.use(documentsRouter);
router.use(applicationsRouter);
router.use(messagesRouter);
router.use(journeyRouter);
router.use(adminRouter);

export default router;
