import express from "express";
import { getProducts, createProduct, findProductByName, findProductById, updateProduct, deleteProduct, getStatus } from "../controllers/productController.js";

export const productRoute = express.Router()

productRoute.get("/",getProducts)
productRoute.post("/create",createProduct)
productRoute.post("/name/",findProductByName)
productRoute.get("/find-id/:id",findProductById)
productRoute.put("/update/:id",updateProduct)
productRoute.delete("/delete/:id",deleteProduct)
productRoute.get("/status",getStatus)
