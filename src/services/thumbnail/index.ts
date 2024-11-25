import Together from "together-ai";

const together = new Together({ apiKey: "42e99d8aa42183e16f17d6545904c8faa56d03eb75b63b16826465e23efc7f9d" });

export async function generateImage(userquery: string) {
    try {
        const response = await together.images.create({
            model: "black-forest-labs/FLUX.1-schnell-Free",
            prompt: userquery,
            width: 1024,
            height: 768,
            steps: 1,
            n: 1
        });

        // Validate and access the response data
        if (response.data && response.data[0]) {
           const imageUrl = (response.data[0] as any).url;
 // Use the `url` field
            console.log("Generated Image URL:", imageUrl);
            return imageUrl;
        } else {
            console.error("Invalid response format:", response);
            throw new Error("Image generation failed or response format is incorrect.");
        }
    } catch (error) {
        console.error("Error generating image:", error);
        throw error;
    }
}
