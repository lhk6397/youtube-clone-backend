import { Request, Response } from "express";

export interface asyncFunc {
  (req: Request, res: Response): Promise<Response>;
}
