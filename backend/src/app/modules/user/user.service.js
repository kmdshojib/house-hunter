import { userModel } from "./user.model.js"

export const createUserToDatabase = async (payload) => {
    const newUser = new userModel(payload)
    await newUser.save()

    return newUser;
}