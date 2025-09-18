import mongoose from "mongoose";
import { MONGODB_URI, UTN_DB } from "./config.js";

export const connectDB = async() => {
    //nos conectamos a la URI de mongo db mongodb://127.0.0.1:27017
    try{
        await mongoose.connect(`${MONGODB_URI}/${UTN_DB}`)
        console.log("DataBase connected")
    } catch (error) {
        console.error("error connecting to database,", error)
        process.exit(1)

    }
}