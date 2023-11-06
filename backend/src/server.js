import mongoose from "mongoose"
import app from "./app.js";
import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT || 5000;


let mongoDBUrl;
if (process.env.NODE_ENV === 'production') {
    mongoDBUrl = `mongodb+srv://${process.env.ADMIN}:${process.env.PASSWORD}@cluster0.ygyoxnw.mongodb.net/`
} else {
    mongoDBUrl = "mongodb://127.0.0.1:27017/house"
}
const main = async () => {
    try {
        await mongoose.connect(mongoDBUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("DB connection established");

        app.listen(port, "0.0.0.0", () => {
            console.log(`House Hunter listening on port ${port} `)
        })


    } catch (error) {
        console.log({ error })
    }
}

main();