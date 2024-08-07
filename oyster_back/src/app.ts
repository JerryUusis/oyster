import express from "express";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors";
import { morganSetup } from "./utils/middleware/morganConfig";
import { unknownEndpoint, errorHandler, tokenExtractor } from "./utils/middleware/middleware";
import userRouter from "./controllers/user";
import loginRouter from "./controllers/login";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(helmet());
app.use(express.json());
app.use(morganSetup);
app.use(tokenExtractor)
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
