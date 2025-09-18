// cerebro de operacion de la autenticacion
import jwt from "jsonwebtoken";

export function verifyToken(token){ //esta funcion verifica y valida que el token sea corecto
    try {
        const decoded = jwt.verify(token, "secret")
    } catch (error) {
        throw new Error("Token invalido")
        
    }
}