import express from "express";
import publicController from "../controllers/public.controller";

const router = express.Router();

router.post("/", publicController.createUser);
router.get("/", publicController.getUsers);

export default router;
