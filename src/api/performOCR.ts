// /src/api/performOCR.ts
import Tesseract from "tesseract.js";

export const performOCR = async (imageBlobs: Blob[]) => {
  const ocrTexts = [];
  for (const imageBlob of imageBlobs) {
    const { data: { text } } = await Tesseract.recognize(imageBlob, "eng");
    ocrTexts.push(text);
  }
  return ocrTexts.join("\n");
};
