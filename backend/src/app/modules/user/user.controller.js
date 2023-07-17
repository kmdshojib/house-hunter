import { createUserToDatabase } from "./user.service.js";

export const createUser = async (req, res) => {
    const data = await req.body;
    console.log({ data })

    const user = await createUserToDatabase(data);
    res.status(200).json({
        data: user
    })


};