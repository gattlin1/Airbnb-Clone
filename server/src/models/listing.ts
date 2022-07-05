import { Field, Float, Int, ObjectType } from 'type-graphql';
import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { getSchemaOptions } from '../util/typegoose';
import { User } from './user';

@ObjectType()
class Review {
  @Field()
  rating: number;

  @Field()
  comment: string;

  @Field()
  userId: string;
}

@ObjectType()
export class Address {
  @Field()
  street: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zip: string;

  @Field()
  country: string;
}

@ObjectType()
export class Listing {
  @Field(() => String)
  readonly _id: string;

  @Field()
  @Property({ required: true })
  name!: string;

  @Field()
  @Property()
  description: string;

  @Field()
  @Property()
  category: string;

  @Field(() => [String])
  @Property()
  amenities: string[];

  @Field(() => Float)
  @Property()
  price: number;

  @Field(() => Int)
  @Property()
  recommendedGuestCount: number;

  @Field(() => Int)
  @Property()
  bedrooms: number;

  @Field(() => Int)
  @Property()
  beds: number;

  @Field(() => Float)
  @Property()
  baths: number;

  @Field()
  @Property()
  imageUrl: string;

  @Field(() => [Review])
  @Property()
  reviews: Review[];

  @Field()
  @Property({ required: true })
  hostId!: User;

  @Field(() => Address)
  @Property({ required: true })
  address!: Address;
}

export const ListingModel = getModelForClass(Listing, getSchemaOptions());
