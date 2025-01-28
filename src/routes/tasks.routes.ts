import { Router } from 'express'
import { TasksController } from '../controllers/tasks-controller'

const tasksRoutes = Router()
const tasksController = new TasksController()

tasksRoutes.post('/tasks', tasksController.create)

export { tasksRoutes }