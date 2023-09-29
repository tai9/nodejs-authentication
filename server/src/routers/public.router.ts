import express from "express";
import publicController from "../controllers/public.controller";
import { ensureAuthenticatedUser } from "../middlewares/ensureAuthenticated";

const router = express.Router();

// authentication
router.use(ensureAuthenticatedUser);

router.post("/", publicController.createUser);
router.get("/", publicController.getUsers);

export default router;
