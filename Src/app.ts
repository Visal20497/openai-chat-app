import express from "express";
import aiRoutes from "./routes/aiRoutes";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "GenAI TypeScript API is running",
  });
});

app.use("/api/ai", aiRoutes);

export default app;
