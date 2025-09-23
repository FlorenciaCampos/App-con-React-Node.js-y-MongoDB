import express from "express";
import { getProducts  } from "../controllers/productController.js";

export const productRoute = express.Router()

productRoute.get("/",getProducts)