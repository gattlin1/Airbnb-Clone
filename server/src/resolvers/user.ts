import { User, UserModel } from '../models/user';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { MyContext } from '../types';
import { CredentialsInput } from './CredentialsInput';
import argon2 from 'argon2';
import { validateRegister } from '../util/validateRegister';

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    // current user and ok to show email
    if (req.session.userId === user._id) {
      return user.email;
    }

    // not the current user
    return '';
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    console.log(req);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('credentials') credentials: CredentialsInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(credentials.password);
    const errors = validateRegister(credentials);
    if (errors) return { errors };

    let user;
    try {
      user = await UserModel.create({
        username: credentials.username,
        password: hashedPassword,
        email: credentials.email,
      });
    } catch (err) {
      if (err.code === 11000) {
        console.log(err);
        return {
          errors: [{ field: 'username', message: 'username already exists' }],
        };
      }
    }

    // automatically login user
    req.session.userId = user?.id;

    return { user };
  }
}
