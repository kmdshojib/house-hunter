import { verifyToken } from "../../../../verfifyToken.js";
import { bookingsModel } from "./bookings.model.js";

import { createBookingsToDatabase } from "./bookings.service.js";

export const createBookings = async (req, res) => {

    try {
        const token = req.headers.authorization;
        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return res.status(401).send('Unauthorized');
        }
        const bookingData = req.body;
        const makeBooking = await createBookingsToDatabase(bookingData)
        res.status(200).json({
            data: makeBooking,
            message: 'Bookings created successfully',
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while creating the home'
        });
    }
}

export const getBookingsByUserId = async (req, res) => {
    const userId = req.params.id

    try {
        const token = req.headers.authorization;

        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return res.status(401).send('Unauthorized');
        }

        const getData = await bookingsModel.find({ userId: userId });

        if (!getData || getData.length === 0) {
            return res.status(404).send("No Data Found");
        }

        return res.status(200).send(getData);

    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while retrieving the home by ID.');
    }
};

export const deleteBookinById = async (req, res) => {
    const id = req.params.id;
    try {
        const token = req.headers.authorization;
        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return res.status(401).send('Unauthorized');
        }

        const deletedHome = await bookingsModel.findByIdAndDelete(id);

        if (!deletedHome) {
            return res.status(404).send("No Data Found");
        }

        const userId = deletedHome.userId;

        const getData = await bookingsModel.find({ userId: userId });

        if (!getData || getData.length === 0) {
            return res.status(200).send({ message: "No Data Available" });
        }

        return res.status(200).send(getData);

    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while deleting or retrieving the home by ID.');
    }
};