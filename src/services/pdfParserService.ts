import axios from "axios";
import pdfParse from "pdf-parse";

/**
 * Converts a Google Drive shareable link into a direct download link.
 */
function getDirectGoogleDriveUrl(googleDriveUrl: string): string {
  const match = googleDriveUrl.match(/\/d\/(.+?)\/view/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  }
  return googleDriveUrl; // Return original if it's already a direct link
}

export async function extractTextFromPDF(url: string): Promise<string> {
  try {
    // Convert Google Drive share link to a direct download link
    const directUrl = getDirectGoogleDriveUrl(url);
    console.log(`📥 Downloading PDF from: ${directUrl}`);

    // Fetch the PDF file
    const response = await axios.get(directUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/pdf",
      },
    });

    console.log("✅ PDF downloaded successfully, extracting text...");

    // Extract text using pdf-parse
    const pdfData = await pdfParse(response.data);
    console.log("📝 Extracted Text:", pdfData.text);

    return pdfData.text || "No text extracted.";
  } catch (error) {
    console.error("❌ Error extracting text from PDF:", error);
    return "Error extracting text from PDF.";
  }
}
