import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class ThrottleMiddleware implements NestMiddleware {
  private requests: { [key: string]: number } = {};

  use = (req: Request, res: Response, next: Function) => {
    const ip = req.ip;
    const now = Date.now();
    this.throttle(ip, now, res, next);
  };

  private throttle = (
    ip: string,
    now: number,
    res: Response,
    next: Function
  ) => {
    this.requests[ip] = (this.requests[ip] || 0) + 1;

    setTimeout(() => {
      this.requests[ip] -= 1;
    }, 10000);

    if (this.requests[ip] > 10) {
      res.status(429).send("Too many requests");
    } else {
      next();
    }
  };
}
