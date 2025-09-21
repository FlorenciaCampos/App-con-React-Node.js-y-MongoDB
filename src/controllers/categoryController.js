import { createCategoryService } from "../services/categoryService"

export const createCategory = async (req,res) => {
    try {
       const name =  req.body.name

       const savedCategory =  await createCategoryService(name)
       return res.status(201).json({ message:"Nueva categoria creada", data: savedCategory })
        
    } catch (error) {
        return res.status(500).json({ message:"Internal server error", error: error.message })
        
    }
}