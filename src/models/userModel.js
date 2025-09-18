import mongoose, { Types } from "mongoose";
import { isGoodPassword } from "../utils/validator.js";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 20,
        minlength: 2,
        trim: true,//quita espacios adelante y atras
        lowercase: true, //pasa todo a minuscula

    },

    lastName: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 2,
        trim: true,
        lowercase: true, 

    },

    email:{
        type: String,
        required: true,
        maxlength: 30,
        minlength: 2,
        trim: true,
        lowercase: true,
        unique: true, //valida que el mail no se repita
        match: /^\S+@\S+\.\S+$/,


    },

    age:{
        type: Number,
        required: true,
        min:16,
        max: 110,
    },

    password:{
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return isGoodPassword(value)
            },
            message:
            "La contraseña debe tener entre 6 y 12 caracteres, con al menos un número, una letra mayúscula y una letra minúscula."
        }
    }
 

}, {timestamps:true})//cuando se cree y se modifique se guardaran en campos

//moongose nos permite encriptar antes de guardar la password
userSchema.pre("save", function (next) {//encriptamos la password antes de guardarla
    this.password = bcrypt.hashSync(this.password, 10) //10:salt..lo encripta 10 veces
    next()

}
)

export default mongoose.model("user", userSchema)