import express from 'express';
import cors from 'cors';
import userRouter from './app/modules/user/user.route.js';
import dotenv from "dotenv"

const app = express()

app.options('*', cors());
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use("/api/v1/users", userRouter);

export default app;