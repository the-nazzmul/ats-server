import * as fs from "fs";
import * as path from "path";
import pdfParse from "pdf-parse";

async function testPdfExtraction() {
  try {
    // Ensure correct path to the PDF file inside src/
    const filePath = path.join(__dirname, "test_resume.pdf");

    console.log(`📂 Checking file at: ${filePath}`);

    // Read the PDF file
    const dataBuffer = fs.readFileSync(filePath);

    // Extract text using pdf-parse
    const pdfData = await pdfParse(dataBuffer);

    console.log("✅ Successfully Extracted Text:\n", pdfData.text);
  } catch (error) {
    console.error("❌ Error extracting text from PDF:", error);
  }
}

testPdfExtraction();
