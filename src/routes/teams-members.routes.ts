import { Router } from 'express'
import { TeamsMembersController } from '../controllers/teams-members-controller'
import { ensureAuthentication } from '../middlewares/ensure-authentication'
import { verifyUserAuthorization } from '../middlewares/verify-user-authorization'

const teamsMembersRoutes = Router()
const teamsMembersController = new TeamsMembersController()

teamsMembersRoutes.post('/', ensureAuthentication, verifyUserAuthorization(['ADMIN']), teamsMembersController.create)

export { teamsMembersRoutes }