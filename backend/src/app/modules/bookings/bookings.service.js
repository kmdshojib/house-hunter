import { bookingsModel } from "./bookings.model.js"


export const createBookingsToDatabase = async (payload) => {
    const { name, email, houseName, houseLoaction, userId,phoneNumber } = payload

    const newBookings = new bookingsModel({
        name: name,
        email: email,
        houseName: houseName,
        houseLoaction: houseLoaction,
        userId: userId,
        phoneNumber: phoneNumber
    })

    await newBookings.save()
    return newBookings;
}