import { Schema, model } from "mongoose";

const addHomeSchema = new Schema({
    houseName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String, required: true },
    monthlyRent: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    roomSize: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    availableDate: { type: Date, required: true },
    userId: { type: String, required: true }
});



export const addHomeModel = model("addHome", addHomeSchema)