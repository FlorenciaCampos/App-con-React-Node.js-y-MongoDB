import { createProductService,getProductService, findProductByNameService, findProductByIdService, updateProductService } from "../services/productService.js";

export const createProduct = async (req, res) => {
    try {
        const savedProduct = await createProductService(req.body)
        return res.status(200).json(savedProduct)
    } catch (error) {
        return res.status(500).json({message: "internal server error", error: error.message})
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await getProductService()
        return res.status(200).json(products)
    } catch (error) {
        if(error.statusCode === 400){
            return res.status(400).json({ message: error.message })
        }
        return res.status(500).json({message: "internal server error", error: error.message})
    }
}

export const findProductByName = async (req, res) => { 
    try {
     const product = await  findProductByNameService(req.body.name)
     return res.status(200).json(product)

    } catch (error) {
        if(error.statusCode === 400){
            return res.status(400).json({message: error.message})
        }
        return res.status(500).json({message: "internal server error", error: error.message})
  
    }
}

export const findProductById = async (req,res) => {
    try {
        const product = await  findProductByIdService(req.params.id)
        return res.status(200).json(product)
   
       } catch (error) {
           if(error.statusCode === 400){
               return res.status(400).json({message: error.message})
           }
           return res.status(500).json({message: "internal server error", error: error.message})
     
       }

}

export const updateProduct = async (req,res) => {
    try {
        const productId = req.params.id;
        const updateProduct = await updateProductService(productId,req.body)
        return res.status(201).json(updateProduct)

    } catch (error) {
        if(error.statusCode === 400){
            return res.status(400).json({message: error.message})
        }
        return res.status(500).json({message: "internal server error", error: error.message})
  
        
    }
}