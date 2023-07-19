import express from 'express';
import { createHome, deleteHomeById, getAllHome, getHomeByUserId, updateHomeByUserId } from './addHome.controller.js';

const addHomeRoute = express.Router();

addHomeRoute.get("/getAll", getAllHome)

addHomeRoute.post("/addHome", createHome)

addHomeRoute.get("/gethomebyid/:id", getHomeByUserId)

addHomeRoute.delete("/deleteHome/:id", deleteHomeById)

addHomeRoute.put("/updateHome/:id", updateHomeByUserId)

export default addHomeRoute;