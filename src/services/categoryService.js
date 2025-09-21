import category from '../models/categoryModel';

export const createCategoryService = async (name) => {
    const newCategory = new Category({ name })
    const savedCategory = await newCategory.saved()
    return savedCategory
}