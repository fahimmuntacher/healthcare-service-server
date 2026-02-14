import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";

const app: Application = express();

// Middleware
app.use(express.json());

// routes
app.use("/api/v1", IndexRoutes);

// Basic route
app.get("/", (req: Request, res: Response) => {
  // throw new AppError("This is a test error", 400);
  res.send({
    message: "HealthCare Server is running!",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
