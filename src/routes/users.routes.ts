import { Router } from 'express'
import { UsersController } from '../controllers/users-controller'
import { ensureAuthentication } from '../middlewares/ensure-authentication'

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.get('/', ensureAuthentication, usersController.index)
usersRoutes.post('/', usersController.create)

export { usersRoutes }