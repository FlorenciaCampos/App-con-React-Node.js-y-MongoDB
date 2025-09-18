import express from 'express' //importamos express porque nuestro servidor nos va a dar las rutas
import { createUser, getUsers, deleteUser, updateUser, validate } from '../controllers/userController.js'

export const userRouter = express.Router()
//endpoint
userRouter.post("/create", createUser) //userRout = express, post= verb http, create = path, creatuUser = controller
userRouter.get("/getUsers", getUsers)
userRouter.delete("/deleteUser/:id", deleteUser)
userRouter.put("/updateUser/:id", updateUser)
userRouter.post("/login", validate)