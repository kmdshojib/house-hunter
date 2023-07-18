import { userModel } from "./user.model.js"
import bcrypt from 'bcrypt';

export const createUserToDatabase = async (payload) => {
    const { name, email, password, type } = payload;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
        name: name,
        email: email,
        password: encryptedPassword,
        type: type
    })
    await newUser.save()

    return newUser;
}