import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { NotFound, errorHandler } from "./middleware/error.js";
import { logger } from "./middleware/logger.js";
import AuthRoutes from "./routes/auth.js";
import UserRoutes from "./routes/user.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.CLIENT,
  })
);
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);

app.use(NotFound);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(process.env.PORT, () =>
      console.log("Connected to DB and listening on port " + process.env.PORT)
    )
  )
  .catch((err) => console.log(err));
