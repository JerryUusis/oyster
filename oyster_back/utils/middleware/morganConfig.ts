import morgan from "morgan";
import { Request } from "express";

morgan.token("payload", (request: Request) => {
  if (request.body && typeof request.body === "object") {
    return JSON.stringify(request.body);
  }
  return "-";
});

export const morganSetup = morgan(
  ":method :url :status :res[content-length] - :response-time ms :payload"
);
