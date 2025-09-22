import { createCategoryService } from "../services/categoryService.js"

export const createCategory = async (req,res) => {
    try {
       const name =  req.body.name

       const savedCategory =  await createCategoryService(name)
       return res.status(201).json({ message:"Nueva categoria creada", data: savedCategory })
        
    } catch (error) {
        return res.status(500).json({ message:"Internal server error", error: error.message })
        
    }
}

export const getCategories = async (req,res) => {
    try {
        const categories = await getCategoryService()
        return res.status(200).json(categories)
    } catch (error) {
        if(error.statusCode === 204){
            return res.json({message: error.message})
        }
        return res.status(500).json({ message:"Internal server error", error: error.message })

        
    }
}