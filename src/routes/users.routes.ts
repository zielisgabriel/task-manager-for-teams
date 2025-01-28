import { Router } from 'express'
import { UsersController } from '../controllers/users-controller'
import { ensureAuthentication } from '../middlewares/ensure-authentication'
import { verifyUserAuthorization } from '../middlewares/verify-user-authorization'

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.get('/', ensureAuthentication, verifyUserAuthorization(['ADMIN']), usersController.index)
usersRoutes.post('/', usersController.create)

export { usersRoutes }