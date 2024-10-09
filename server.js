import express from "express";
import ideasRouter from "./routes/ideas.mjs";
import userRouter from "./routes/user.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  next();
});

app.use(
  cors({
    origin: `${process.env.REACT_APP_URL}`,
  })
);

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to MongoDB & listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

app.use("/api/ideas", ideasRouter);
app.use("/api/user", userRouter);

export default app;
