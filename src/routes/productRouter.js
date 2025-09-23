import express from "express";
import { getProducts, createProduct, findProductByName } from "../controllers/productController.js";

export const productRoute = express.Router()

productRoute.get("/",getProducts)
productRoute.post("/create",createProduct)
productRoute.post("/name/",findProductByName)
