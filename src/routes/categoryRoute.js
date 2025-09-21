import express from 'express'
import { createCategory } from '../controllers/categoryController'

export const categoryRouter = express.Router()

categoryRouter.post("/create", createCategory)
