import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

export type MyContext = {
  req: Request;
  res: Response;
  redis: Redis;
};
