import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();
const port = Number(process.env.PORT || 8080);

app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get("/api/health", (_, res) => {
  res.json({ ok: true });
});

app.post("/api/gemini/generate-image", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY mancante sul server" });

  const prompt = req.body?.prompt;
  if (!prompt || typeof prompt !== "string") return res.status(400).json({ error: "prompt obbligatorio" });

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ["IMAGE", "TEXT"] },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(502).json({ error: "Gemini upstream error", detail: errorText.slice(0, 800) });
    }

    const data = await response.json();
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((part) => part.inlineData);

    if (!imagePart) return res.status(502).json({ error: "Nessuna immagine ricevuta da Gemini" });
    return res.json({ imageDataUrl: `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}` });
  } catch (error) {
    return res.status(500).json({ error: "Errore server nella generazione immagine", detail: String(error.message || error) });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API pronta su http://localhost:${port}`);
});
