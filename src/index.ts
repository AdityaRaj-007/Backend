import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { generateImage } from './services/thumbnail';

const app: Application = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Expresssss!');
});

app.post('/thumbnail',async (req :any , res:any) => {
  const userIdea = req.body.userIdea;
  console.log(userIdea)
  if (!userIdea) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a search term in the "userIdea" field.',
    });
  }

  const result = await generateImage(userIdea);
  const images = Array.isArray(result) ? result : [result];
  // TODO: AI logic here: Respond with 3 image URLs


  res.json({
    success: true,
    searchTerm: userIdea,
    images,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
