
import { addHomeModel } from './addHome.model.js';

export const createHomeToDatabase = async (payload) => {
    const newHome = new addHomeModel(payload);
    await newHome.save();
    return newHome;
}
