import { User } from '../entities/user';
import { Ctx, Query, Resolver } from 'type-graphql';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: any) {}
}
