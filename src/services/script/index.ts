import { RequestHandler } from "express";
import { Together } from "together-ai";
require("dotenv").config();
//console.log(process.env.TOGETHER_AI_API_KEY);
const together = new Together({
  apiKey: process.env.TOGETHER_AI_API_KEY,
});

export const generateScript: RequestHandler = async (req, res) => {
  const { points } = req.body;

  if (!points || !Array.isArray(points)) {
    res.status(400).json({ message: "Please provide some points." });
    return;
  }

  try {
    const prompt = `
        You are a professional scriptwriter. Write a YouTube video script based on these points:
        ${points.map((point, index) => `${index + 1}. ${point}`).join("\n")}

        The script should include:
        - An engaging introduction.
        - Detailed explanations for each point.
        - A conclusion with a call to action.
        `;

    const response = await together.completions.create({
      model: "meta-llama/Llama-2-70b-hf",
      prompt,
      max_tokens: 500,
    });

    const content = response.choices?.[0]?.text?.trim();

    if (!content) {
      res.status(500).json({ message: "Failed to generate script." });
      return;
    }

    res.status(200).json({ message: "Script generated successfully", content });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    res.status(500).json({ message: "Error generating content." });
  }
};
