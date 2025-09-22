import express from 'express'
import { createCategory } from '../controllers/categoryController.js'

export const categoryRouter = express.Router()

categoryRouter.post("/create", createCategory)
