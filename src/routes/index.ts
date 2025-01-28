import { Router } from 'express'
import { usersRoutes } from './users.routes'
import { teamsRoutes } from './teams.routes'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/teams', teamsRoutes)

export { routes }