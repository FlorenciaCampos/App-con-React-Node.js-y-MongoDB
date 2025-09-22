import express from 'express'
import { createCategory, getCategories } from '../controllers/categoryController.js'

export const categoryRouter = express.Router()

categoryRouter.post("/create", createCategory)
categoryRouter.get("/getCategories", getCategories)