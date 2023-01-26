import express, { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.loggedInUser) {
    return res.json({ isAuth: false, error: true });
  }
  next();
};

export default authMiddleware;
