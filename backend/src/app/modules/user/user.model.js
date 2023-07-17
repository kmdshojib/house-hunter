import { Schema, model } from "mongoose";
// import autoIncrement from "mongoose-auto-increment"

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String,unique: true, required: true},
    password: { type: String, required: true },
    type: { type: String, required: true }
});

// userSchema.plugin(autoIncrement.plugin, {
//     model: "User",
//     field: 'id',
//     startAt: 1,
//     incrementBy: 1
// })

export const userModel = model("User", userSchema)