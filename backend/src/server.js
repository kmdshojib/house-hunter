import mongoose from "mongoose"
import app from "./app.js";

const port = 5000;

const main = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/house-hunter');

        console.log("DB connection established");

        app.listen(port, () => {
            console.log(`House Hunter listening on port ${port} `)
        })


    } catch (error) {
        console.log({ error })
    }
}

main();