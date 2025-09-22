import express from 'express'
import { createCategory, deleteCategory, getCategories } from '../controllers/categoryController.js'

export const categoryRouter = express.Router()

categoryRouter.post("/create", createCategory)
categoryRouter.get("/getCategories", getCategories)
categoryRouter.delete("/delete", deleteCategory)