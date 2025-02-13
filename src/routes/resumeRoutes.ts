import express, { Request, Response } from "express";
import { processResume } from "../controllers/resumeController";

const router = express.Router();

// Define the POST route correctly
router.post("/process", async (req: Request, res: Response) => {
  try {
    await processResume(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
