import express from 'express';
import { createBookings, deleteBookinById, getBookingsByUserId } from './bookings.controller.js';

const bookingRoute = express.Router();

bookingRoute.get("/bookings/:id", getBookingsByUserId);
bookingRoute.post("/bookings", createBookings);

bookingRoute.delete("/deleteBookings/:id", deleteBookinById)

export default bookingRoute;