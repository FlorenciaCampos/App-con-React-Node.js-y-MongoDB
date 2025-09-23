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

export const findProductByIdService = async(id) =>{
    const productExist = await Product.findOne({_id:id})

    if(!productExist){
        const error = new Error(`el producto ${id} no existe`)
        error.statusCode = 400
        throw error
    }
    return {productExist}
}

export const findProductByNameService = async(name) =>{
    const productExist = await Product.find({
        name :{$regex:name, $options: 'i'} //regex hace una busqueda parcial y la 'i' no es sensible a mayusculas y minusculas
    })

    if(!productExist){
        const error = new Error(`el producto ${name} no existe`)
        error.statusCode = 400
        throw error
    }
    return {productExist}
}