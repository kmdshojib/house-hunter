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
    const { email, password } = req.body;
    const authToken = process.env.AUTH_TOKEN;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User not registered or invalid email address!' });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({ error: 'Invalid password!' });
        }

        const token = jwt.sign({ userId: user._id }, authToken, { expiresIn: '6h' });


        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 6 * 60 * 60 * 1000,
        });

        res.status(200).json({
            data: {
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    type: user.type,
                },
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}