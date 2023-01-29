import express from "express";
import dotenv from "dotenv";
import appRoutes from "./routes/app";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 9419;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(appRoutes);
app.listen(port, () => {});
