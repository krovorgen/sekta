import type { Request, Response } from 'express'
import { Theme } from '../../db'
import { getThemeInstance } from '../../preload'

export const themeController = {
  async getTheme(req: Request, res: Response) {
    try {
      const instance = await getThemeInstance(req.body.id)
      res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      res.status(200).json(instance)
    } catch (error) {
      res.status(500).json({ error })
    }
  },

  async updateTheme(req: Request, res: Response) {
    try {
      const instance = await Theme.findOne({
        where: {
          userId: req.body.id,
        },
      })

      await instance?.update({ theme: req.body.theme })
      res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  },
}
