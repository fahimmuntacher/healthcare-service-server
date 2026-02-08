import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";

const app: Application = express();

// Middleware
app.use(express.json());

// routes
app.use("/api/v1", IndexRoutes)

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "HealthCare Server is running!",
  });
});

export default app;