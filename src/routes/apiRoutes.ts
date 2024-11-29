import { Router } from "express";
import { generateImage } from "../services/thumbnail";
import { generateScript } from "../services/script";
import { generateDescription } from "../services/description";

const router = Router();

router.post("/thumbnail", generateImage);

router.post("/script", generateScript);

router.post("/description", generateDescription);

export default router;
