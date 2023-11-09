import { NextFunction } from 'express'
import type { Request, Response } from 'express'

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authCookie = await req.cookies.authCookie
  if (authCookie) {
    return next()
  }
  res.redirect('/signin')
}
