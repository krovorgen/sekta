import { Router } from 'express'
import { commentController } from '../controllers/comment'

export const commentsRoutes = Router({})

commentsRoutes
  .get('/forum/comment', commentController.getComments)
  .post('/forum/comment', commentController.createComment)
