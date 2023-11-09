import { Router } from 'express'
import { topicController } from '../controllers/topic'

export const topicRouter = Router({})

topicRouter
  .get('/forum/topic', topicController.getTopics)
  .post('/forum/topic', topicController.createTopic)
