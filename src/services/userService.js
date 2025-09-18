//crear usuarios

import User from '../models/userModel.js'
import {findUserByIdAndCheck} from "../utils/userHelpers.js"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


export const createUserService = async(userData) => {
    
    const userExists = await User.findOne({ email: userData.email });
    if(userExists){
        throw new Error("Usuario ya existe con ese mail")
    }
    const newUser = new User(userData);
    await newUser.save();
    return { message: "Usuario Creado" }
    

}

//Obtener Usuarios

export const  getUsersService = async() => {
   const users = await User.find()  //usamos awai porque es un llamado a la db. el find() te trae todo
   if(users.length === 0){ //validamos por si no hay usuarios
    const error = new Error("No hay usuarios")
    error.statusCode = 201
    throw error

   }
   return users

}

//borrar usuarios
export const deleteUserService = async(userId) => {
    await findUserByIdAndCheck(userId)
    
    await User.findByIdAndDelete(userId)
    return {message: "Usuario eliminado exitosamente"}

}

//actualizar usuarios
export const updateUserService = async (userId, updateData) =>{
    await findUserByIdAndCheck(userId)
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updateData, { new:true })//new: true devuelve el documento modificado y actual
    return updatedUser;
}
//validar usuarios
export const validateUserService = async(email,password) => {
    console.log({email, password})
    if(!(email && password)){
        const error = new Error ("faltan llenar campos")
        error.statusCode = 400;
        throw error
    }


    const userFound = await User.findOne({email})
    console.log(userFound)
    if(!userFound){
        const error = new Error("el usuario o contraseña es incorrecto")
        error.statusCode = 400;
        throw error;
    }
    //bcrypt encripta la contraseña
    if(!bcrypt.compareSync(password,userFound.password)){ //encripta la contraseña del req y la compara con la de la encriptada de la db
        const error = new Error("usuario o contraseña incorrecto")
        error.statusCode = 400;
        throw error;
    } 
    //paylod es la info que le cargamos al token
    const payload = {
        userId: userFound._id,
        userEmail:userFound.email
    }

    //el token tiene validacion una vez firmado
    //el sign necesita: Payload, secret y duracion del token
    const token = jwt.sign(payload, "secret", { expiresIn: "1h" });//aca lo firmamos
    return { message: "Estas logueado ", token}

}