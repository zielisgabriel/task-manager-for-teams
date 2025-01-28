import { Router } from 'express'
import { TeamsController } from '../controllers/teams-controller'
import { ensureAuthentication } from '../middlewares/ensure-authentication'
import { verifyUserAuthorization } from '../middlewares/verify-user-authorization'

const teamsRoutes = Router()
const teamsController = new TeamsController()

teamsRoutes.get('/', ensureAuthentication, verifyUserAuthorization(['ADMIN']), teamsController.index)
teamsRoutes.post('/', ensureAuthentication, verifyUserAuthorization(['ADMIN']), teamsController.create)
teamsRoutes.delete('/:id', teamsController.delete)

export { teamsRoutes }