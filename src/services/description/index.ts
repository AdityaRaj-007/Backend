import { RequestHandler } from "express";
import { Together } from "together-ai";
require("dotenv").config();

const together = new Together({
  apiKey: process.env.TOGETHER_AI_API_KEY,
});

export const generateDescription: RequestHandler = async (req, res) => {
  const { script } = req.body;

  if (!script || typeof script !== "string") {
    res.status(400).json({ message: "Please provide a valid script." });
    return;
  }

  try {
    const prompt = `
        You are an expert content creator. Write a concise and engaging YouTube video description based on the following script:
        "${script}"
        
        The description should:
        - Summarize the script.
        - Include relevant keywords for search optimization.
        - Be written in an engaging style to attract viewers.
        - End with a call-to-action encouraging viewers to watch the video.
        `;

    const response = await together.completions.create({
      model: "meta-llama/Llama-2-70b-hf",
      prompt: prompt,
      max_tokens: 300,
    });

    const description = response.choices?.[0]?.text?.trim();

    if (!description) {
      res
        .status(500)
        .json({ message: "Failed to generate description using Together AI." });
      return;
    }

    res.status(200).json({
      message: "YouTube description generated successfully.",
      description,
    });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    res.status(500).json({
      message: "Error generating description using Together AI.",
      error,
    });
  }
};
