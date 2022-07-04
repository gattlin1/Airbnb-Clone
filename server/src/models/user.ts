import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { getSchemaOptions } from '../util/typegoose';

@ObjectType()
export class User {
  @Field(() => String)
  readonly _id: string;

  @Field()
  @Property({ required: true, unique: true, index: true })
  username!: string;

  @Field()
  @Property({ required: true, unique: true })
  email!: string;

  @Property({ required: true })
  password!: string;
}

export const UserModel = getModelForClass(User, getSchemaOptions());
