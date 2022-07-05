import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';
import mongoose from 'mongoose';
import cors from 'cors';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { COOKIE_NAME, __prod__ } from './constants';
import { ListingResolver } from './resolvers/listing';

async function main() {
  mongoose.connect('mongodb://localhost:27017/airbnbClone', (err) => {
    if (err) throw err;
    console.log('Successfully connected');
  });

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis('127.0.0.1:6379');
  app.set('trust proxy', 1);

  app.use(
    cors({
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
        //domain: __prod__ ? '' : undefined, // for production purposes fill in string with domain
      },
      saveUninitialized: false,
      secret: 'asl;kdfjasdlkfowierj',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ListingResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log('server started 4000');
  });
}

main();
