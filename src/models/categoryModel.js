import mongoose from "mongoose";

const categoriSchema = new mongoose.Schema ({
    name: {
        type: String,
        reqired: true,
        unique: true,
        trim: true,
        maxLength: 30,
        minLength:2
    },
    
    timestamps:true
    
    
})

export default mongoose.model("category", categoriSchema)