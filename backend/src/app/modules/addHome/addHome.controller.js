import { verifyToken } from "../../../../verfifyToken.js";
import { addHomeModel } from "./addHome.model.js";
import { createHomeToDatabase } from "./home.service.js";

export const createHome = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return res.status(401).send('Unauthorized');
        }

        const homeData = req.body;
        const createdHome = await createHomeToDatabase(homeData);

        res.status(200).json({
            data: createdHome,
            message: 'Home created successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while creating the home'
        });
    }
};

// get data
export const getHomeByUserId = async (req, res) => {
    const userId = req.params.id

    try {
        const token = req.headers.authorization;
        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return res.status(401).send('Unauthorized');
        }

        const getData = await addHomeModel.find({ userId: userId });

        if (!getData || getData.length === 0) {
            return res.status(404).send("No Data Found");
        }

        return res.status(200).send(getData);

    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while retrieving the home by ID.');
    }
};

// delete data

export const deleteHomeById = async (req, res) => {
    const homeId = req.params.id;

    try {
        const token = req.headers.authorization;
        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return res.status(401).send('Unauthorized');
        }

        const deletedHome = await addHomeModel.findByIdAndDelete(homeId);

        if (!deletedHome) {
            return res.status(404).send("No Data Found");
        }

        const userId = deletedHome.userId;

        const getData = await addHomeModel.find({ userId: userId });

        if (!getData || getData.length === 0) {
            return res.status(404).send("No Data Found");
        }

        return res.status(200).send(getData);

    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while deleting or retrieving the home by ID.');
    }
};
// update data
export const updateHomeByUserId = async (req, res) => {
    const userId = req.params.id;

    try {
        const token = req.headers.authorization;
        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return res.status(401).send('Unauthorized');
        }

        const { newData } = req.body;

        const updateData = await addHomeModel.findOneAndUpdate(
            { userId: userId },
            { newData },
            { new: true }
        );

        if (!updateData) {
            return res.status(404).send('No Data Found');
        }

        const getData = await addHomeModel.find({ userId: userId });

        if (!getData || getData.length === 0) {
            return res.status(404).send('No Data Found');
        }

        return res.status(200).send(getData);
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while updating the home by ID.');
    }
};
