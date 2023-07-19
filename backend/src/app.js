import express from 'express';
import cors from 'cors';
import userRouter from './app/modules/user/user.route.js';
import dotenv from "dotenv"
import addHomeRoute from './app/modules/addHome/addHome.route.js';
import bookingRoute from './app/modules/bookings/bookings.route.js';

const app = express()

app.options('*', cors());
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use("/api/v1/users", userRouter);

app.use("/api/v1/home", addHomeRoute);

app.use("/api/v1/bookings", bookingRoute)

export default app;