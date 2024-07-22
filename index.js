import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { UserRouter } from "./routes/user.js";

const app = express();
dotenv.config();
const dbURI = process.env.MONGODB_URI;
const allowedOrigins = [
  'http://localhost:3001',
  'https://internsportal.netlify.app'
];

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(cookieParser());

app.use("/auth", UserRouter);

mongoose.connect(dbURI, {
  tlsInsecure: true 
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});