import { verifyToken } from "../utils/verifyToken.js";

export const verifyTokenMiddleware = (req,resp,next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader)
        
        if(!authHeader || !authHeader.startsWith("Bearer ")){// si no hay token o no empieza con Biren, falla
            return resp.status(400).json({message: "token de acceso no proporcionado"})

        }

        const token = authHeader.split(" ")[1]; 
        //authHeader.split(" ")[1] //separamos bearer del resto del token
        const decoded = verifyToken(token)//el mismo token que lo firmo, puede verificar si es valido o no
        console.log({decoded})//lo hacemos asi lo podemos ver
        req.user = decoded //guardamos el token en el req del user
        next()//si todo salio bien, se lo guarda y pasa al controller

        
    } catch (error) {
        return resp.status(400).json({message: "token de acceso invalido",error: error.message})
        
    }

}