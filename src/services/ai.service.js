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
    config: {
      systemInstruction: `
      You are an expert in generating captions for images.

      you generate single caption for the image provided in the input.

      The caption should be concise, descriptive, and relevant to the content of the image.

      you use hashtags and emojis in the caption.

      `,
    },
  });
  return response.text;
}

module.exports = genAi;
