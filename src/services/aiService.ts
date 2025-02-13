import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_API_URL =
  "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";

export async function analyzeResume(
  resumeText: string,
  jobDescription: string
): Promise<string> {
  try {
    if (!HUGGINGFACE_API_KEY) {
      throw new Error("❌ HUGGINGFACE_API_KEY is missing in .env file.");
    }

    console.log("📤 Sending request to Hugging Face API...");

    const candidateLabels = [
      "Highly Relevant",
      "Moderately Relevant",
      "Not Relevant",
    ];

    const payload = {
      inputs: `Job Description: ${jobDescription}\nResume: ${resumeText}`,
      parameters: { candidate_labels: candidateLabels },
    };

    console.log("📦 API Request Payload:", JSON.stringify(payload, null, 2));

    const response = await axios.post(HF_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ AI Response:", JSON.stringify(response.data, null, 2));

    if (
      !response.data ||
      !response.data.labels ||
      response.data.labels.length === 0
    ) {
      console.error("❌ No valid response from AI.");
      return "⚠️ AI did not return any feedback.";
    }

    return `Resume Relevance: ${response.data.labels[0]} (Confidence: ${
      response.data.scores[0] * 100
    }%)`;
  } catch (error: any) {
    console.error(
      "❌ Hugging Face API Error:",
      error.response?.data || error.message
    );
    return `Error analyzing resume: ${
      error.response?.data?.error || "Unknown error"
    }`;
  }
}
