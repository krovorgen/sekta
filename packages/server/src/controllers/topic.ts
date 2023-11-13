import type { Request, Response } from 'express'
import { Topic } from '../../db'

export const topicController = {
  async getTopics(_: Request, res: Response) {
    try {
      const topics = await Topic.findAll()
      res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      res.status(200).json(topics)
    } catch (error) {
      res.status(500).json({ error })
    }
  },

  async createTopic(req: Request, res: Response) {
    try {
      console.log(req.body)
      const topic = await Topic.create(req.body)
      res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      res.status(201).json(topic)
    } catch (error) {
      res.status(500).json({ error })
    }
  },
}
