import express, { Application, Request, Response } from "express";

const app: Application = express();

// Middleware
app.use(express.json());

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "HealthCare Server is running!",
  });
});

export default app;