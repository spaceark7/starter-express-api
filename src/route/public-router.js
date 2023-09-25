import userController from '../controller/user-controller.js'
import express from 'express'

const publicRouter = new express.Router()

publicRouter.post('/api/register', userController.register)
publicRouter.post('/api/login', userController.login)

export { publicRouter }
