import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Expresssss!');
});

app.post('/thumbnail', (req :any , res:any) => {
  const userIdea = req.body.userIdea;
  
  if (!userIdea) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a search term in the "userIdea" field.',
    });
  }

  // TODO: AI logic here: Respond with 3 image URLs
  const images = [
    `https://images.app.goo.gl/Cc3rAmbTEJe2L5gF9`,
    `https://images.app.goo.gl/Cc3rAmbTEJe2L5gF9`,
    `https://images.app.goo.gl/Cc3rAmbTEJe2L5gF9`
  ];

  res.json({
    success: true,
    searchTerm: userIdea,
    images,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
