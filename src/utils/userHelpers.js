import User from "../models/userModel.js"

export const findUserByIdAndCheck = async (userID) => {
    const userExists = await User.find({_id: userID} )

    if(!userExists){
        const error = new Error("Usuario no encontrado")
        error.statusCode =404
        throw error 
    }
    return userExists
}