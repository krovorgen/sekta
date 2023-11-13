import type { Request, Response } from 'express'
import { Topic } from '../../db'

export const topicController = {
  async getTopics(_: Request, res: Response) {
    try {
      const topics = await Topic.findAll()

      res.status(200).json(topics)
    } catch (error) {
      res.status(500).json({ error })
    }
  },

  async createTopic(req: Request, res: Response) {
    try {
      const topic = await Topic.create(req.body)

      res.status(201).json(topic)
    } catch (error) {
      res.status(500).json({ error })
    }
  },
}
