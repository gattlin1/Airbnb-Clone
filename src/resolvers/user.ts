import { User } from '../models/user';
import { Ctx, Query, Resolver } from 'type-graphql';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: any) {
    console.log(req);
  }
}
