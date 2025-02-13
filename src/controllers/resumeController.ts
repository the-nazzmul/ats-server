import { Request, Response } from "express";
import { extractTextFromPDF } from "../services/pdfParserService";
import { analyzeResume } from "../services/aiService";

export async function processResume(req: Request, res: Response) {
  try {
    const { pdfUrl, jobDescription } = req.body;

    if (!pdfUrl || !jobDescription) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const resumeText = await extractTextFromPDF(pdfUrl);
    if (!resumeText) {
      return res.status(500).json({ error: "Failed to extract text from PDF" });
    }

    const feedback = await analyzeResume(resumeText, jobDescription);
    return res.json({ resumeText, feedback });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
