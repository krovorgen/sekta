import type { Request, Response } from 'express'
import { Comment } from '../../db'

export const commentController = {
  async getComments(req: Request, res: Response) {
    try {
      const comments = await Comment.findAll({
        where: { id_topic: req.query.id_topic },
      })
      res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      res.status(200).json(comments)
    } catch (error) {
      res.status(500).json({ error })
    }
  },

  async createComment(req: Request, res: Response) {
    try {
      const comment = await Comment.create(req.body)
      res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      res.status(201).json(comment)
    } catch (error) {
      res.status(500).json({ error })
    }
  },
}
