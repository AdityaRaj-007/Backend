import Together from "together-ai";

const together = new Together({
  apiKey: "1d5dc7a02154315153d095169ac65a2480d4c913808a641187ceb28ef702e5a2",
});

export async function generateImage(userquery: string) {
  try {
    const response = await together.images.create({
      model: "black-forest-labs/FLUX.1-schnell-Free",
      prompt: userquery,
      width: 1024,
      height: 768,
      steps: 1,
      n: 1,
    });

    // Validate and access the response data
    if (response.data && response.data[0]) {
      const imageUrl = (response.data[0] as any).url;
      // Use the `url` field
      console.log("Generated Image URL:", imageUrl);
      return imageUrl;
    } else {
      console.error("Invalid response format:", response);
      throw new Error(
        "Image generation failed or response format is incorrect."
      );
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
