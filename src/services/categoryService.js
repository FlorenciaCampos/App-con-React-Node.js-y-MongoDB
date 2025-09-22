import Category from '../models/categoryModel.js';

export const createCategoryService = async (name) => {
    const newCategory = new Category({ name })
    const savedCategory = await newCategory.save()
    return savedCategory
}

export const getCategoryService = async() => {
   const categories= await Category.find()
   
   if(categories.length === 0) {
    const error = new Error("No hay categorias")
    error.statusCode = 204;
    throw error;
   }
   return categories;
}

