import { Router } from 'express'
import { themeController } from '../controllers/theme'

export const themeRoutes = Router()

themeRoutes
  .post('/theme/update', themeController.updateTheme)
  .post('/theme', themeController.getTheme)
