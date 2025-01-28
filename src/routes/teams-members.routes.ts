import { Router } from 'express'
import { TeamsMembersController } from '../controllers/teams-members-controller'

const teamsMembersRoutes = Router()
const teamsMembersController = new TeamsMembersController()

teamsMembersRoutes.post('/', teamsMembersController.create)

export { teamsMembersRoutes }