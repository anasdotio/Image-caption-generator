const { GoogleGenAI } = require("@google/genai");
const { text } = require("express");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function genAi(imageBuffer) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBuffer,
        },
      },
      { text: "caption this image in 10 words" },
    ],
  });
  return response.text;
}

module.exports = genAi;
