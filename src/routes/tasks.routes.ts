import { Router } from 'express'
import { TasksController } from '../controllers/tasks-controller'
import { ensureAuthentication } from '../middlewares/ensure-authentication'
import { verifyUserAuthorization } from '../middlewares/verify-user-authorization'

const tasksRoutes = Router()
const tasksController = new TasksController()

tasksRoutes.get('/tasks', ensureAuthentication, verifyUserAuthorization(['ADMIN', 'MEMBER']), tasksController.index)
tasksRoutes.post('/tasks', ensureAuthentication, verifyUserAuthorization(['ADMIN']), tasksController.create)
tasksRoutes.patch('/tasks/:id', ensureAuthentication, verifyUserAuthorization(['ADMIN', 'MEMBER']), tasksController.updateStatus)

export { tasksRoutes }