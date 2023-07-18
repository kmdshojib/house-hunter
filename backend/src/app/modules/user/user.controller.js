import { userModel } from "./user.model.js";
import { createUserToDatabase } from "./user.service.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    const data = await req.body;
    const user = await createUserToDatabase(data);
    res.status(200).json({
        data: user
    })
};

export const loginUser = async (req, res) => {
    const { email, password } = await req.body;
    const authToken = process.env.AUTH_TOKEN

    const user = await userModel.findOne({ email: email });

    if (!user) {
        throw new Error("User not registered or invalid email address!");
    };

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        throw new Error("Opps! Invalid Password!");
    }

    const token = jwt.sign({ userId: user._id }, authToken, {
        expiresIn: "6h"
    })

    res.status(200).json({
        data: {
            token: token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                type: user.type,
            }
        }
    })
};