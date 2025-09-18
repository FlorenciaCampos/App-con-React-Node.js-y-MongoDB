import { createUserService, deleteUserService, getUsersService,updateUserService, validateUserService } from "../services/userService.js"
//actuan como intermediarios entre cliente y logia.Recibe solicitudes, las procesa y las devuelve.Incluye a los servicios

//crear usuarios
export const createUser = async(req,res) => {
    try{
       const response = await createUserService(req.body)
       res.status(201).json(response)
    } catch(error){
        return res.status(500).json({ message:"Internal server error", error: error.message })
        }
}

//obtener usuarios
export const getUsers = async(req,res) => {
    try {

      const users =   await getUsersService()
      res.status(200).json(users) //200 significa que la operacion fue exitosa
        
    } catch (error) {
        if(error.statusCode === 204){
            return res.status(error.statusCode).json({ message: error.message })
        }
        return res.status(500).json({ message:"Internal server error", error: error.message })     
    }

}

//borrar usuario

export const deleteUser = async(req,res) => {
    try {
        const userId = req.params.id //con el path params obtenemos el id
        const result = await deleteUserService(userId)
        return res.status(200).json(result)
        
    }catch (error) {
        if(error.statusCode === 404){
            return res.status(404).json({ message: error.message })
        }

        return res.status(500).json({ message:"Internal server error", error: error.message })   
    }

}

  //actualizamos usuarios
  export const updateUser = async( req,res ) => {
    try {
        const userId = req.params.id
        const updatedUser = await updateUserService(userId, req.body)//siempre que editamos se necesita id y nuevos datos
        return res.status(201).json(updatedUser)
        
    } catch (error) {
        if(error.statusCode === 404){
            return res.status(404).json({ message: error.message})
        }
        return res.status(500).json({ message:"Internal server error", error: error.message })  
    
    }
 
    }
//validar usuarios
    export const validate = async(req,res) =>{
        try {
            const { email,password } = req.body;
            const result = await validateUserService(email,password);
            return res.status(200).json(result);
        } catch (error) {
            if(error.statusCode === 400){
             return res.status(400).json({message: error.message})
            }
            return res.status(500).json({ message:"Internal server error", error: error.message })  
        }
    }
  

