import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Example configuration to allow specific headers

const corsOptions = {
  origin: process.env.VERCEL_DOMAIN,
  credentials: true, // If you need to include cookies in request's header
};

// Express Middlewares

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

//****************USING ROUTES**************** */

import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

//********************************************* */

const port = process.env.PORT || 3000;

connectDB().then(() => {
  try {
    app.listen(port, () => {
      console.log("App is listening on port", port);
    });
  } catch (error) {
    console.log("Express connection failed, ", error);
  }
});
