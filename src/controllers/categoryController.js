import { createCategoryService, deleteCategoryService,getCategoryService } from "../services/categoryService.js"

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
            return res.status(204).json({message: error.message})
        }
        return res.status(500).json({ message:"Internal server error", error: error.message })
  }
}

 const deleteCategory = async (req,res) => {

    try {
      const categoryId = req.params.id
      const deletedCategory = await deleteCategoryService(categoryId)
      return res.status(200).json(deletedCategory)

    } catch (error) {
        if(error.statusCode === 400){
            return res.status(error.statusCode).json({ message: error.message })
        }
    }
    return res.status(500).json({ message:"Internal server error", error: error.message })

}