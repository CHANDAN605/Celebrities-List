import express from "express";
import {
  getCelebrities,
  getCelebritieById,
  editCelebritieById,
  deleteCelebritie,
} from "../controller/celebritie-controller.js";

const router = express.Router();

router.get("/celebrities", getCelebrities);
router.get("/celebritie/:id", getCelebritieById);
router.post("/editcelebritie/:id", editCelebritieById);
router.post("/deletecelebritie/:id", deleteCelebritie);
export default router;
