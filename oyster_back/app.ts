import express from "express";
import cors from "cors";
import helmet from "helmet";
import { morganSetup } from "./utils/middleware/morganConfig";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morganSetup);

export default app;
