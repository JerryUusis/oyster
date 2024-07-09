import express from "express";
import cors from "cors";
import helmet from "helmet";
import { morganSetup } from "./utils/middleware/morganConfig";
import userRouter from "./controllers/user";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(helmet());
app.use(express.json());
app.use(morganSetup);
app.use("/api/user", userRouter)

export default app;
