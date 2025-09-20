import mongoose from "mongoose";

const categoriSchema = new mongoose.Schema ({
    name: {
        type: String,
        reqired: true,
        unique: true,
        trim: true,
        maxLength: 30,
        minLength:2
    }
})

export default mongoose.model("category", categoriSchema)