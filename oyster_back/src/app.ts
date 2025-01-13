import express from "express";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors";
import { morganSetup } from "./utils/middleware/morganConfig";
import {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
} from "./utils/middleware/middleware";
import userRouter from "./controllers/user";
import loginRouter from "./controllers/login";
import favouritesRouter from "./controllers/favourites";

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(helmet());
app.use(express.json());
app.use(morganSetup);
app.use(tokenExtractor);
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/favourites", favouritesRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
