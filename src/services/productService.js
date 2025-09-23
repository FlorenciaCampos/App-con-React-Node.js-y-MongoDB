import Product from "../models/productsModel.js";

export const createProductService = async (productData) =>{
    const newProduct = new Product(productData)
    const saveProduct = await newProduct.save()
    return saveProduct

}

export const getProductService = async() =>{
    //con populate traemos todos los datos de category, no solo el objetId
   const products = await Product.find().populate("category")
    if(products.length === 0){
        const error = new Error("No hay productos")
        error.statusCode = 204
        throw error
    }
    return products
}

export const findProductByNameService = async(name) =>{
    const productExist = await Product.findOne({name})

    if(!productExist){
        const error = new Error(`el producto ${name} no existe`)
        error.statusCode = 400
        throw error
    }
    return {productExist}
}