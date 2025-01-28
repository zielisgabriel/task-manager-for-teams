import { Router } from 'express'
import { usersRoutes } from './users.routes'
import { teamsRoutes } from './teams.routes'
import { teamsMembersRoutes } from './teams-members.routes'
import { tasksRoutes } from './tasks.routes'
import { sessionsRoutes } from './sessions.routes'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/teams', teamsRoutes)
routes.use('/teams', tasksRoutes)
routes.use('/teams-members', teamsMembersRoutes)
routes.use('/sessions', sessionsRoutes)

export { routes }