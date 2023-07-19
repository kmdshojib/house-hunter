import { Schema, model } from "mongoose";

const bookingsSchema = new Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    email: { type: String, required: true, unique: false },
    houseName: { type: String, required: true },
    houseLoaction: { type: String, required: true },
    phoneNumber: { type: String, required: true },

});



export const bookingsModel = model("booking", bookingsSchema)