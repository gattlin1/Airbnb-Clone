import { Field, Float, Int, ObjectType } from 'type-graphql';
import {
  getModelForClass,
  ModelOptions,
  prop as Property,
  Severity,
} from '@typegoose/typegoose';
import { getSchemaOptions } from '../util/typegoose';

@ObjectType()
export class Review {
  @Field()
  @Property()
  rating: number;

  @Field()
  @Property()
  comment: string;

  @Field()
  @Property()
  userId: string;
}

@ObjectType()
export class Address {
  @Field()
  @Property()
  street: string;

  @Field()
  @Property()
  city: string;

  @Field()
  @Property()
  state: string;

  @Field()
  @Property()
  zip: string;

  @Field()
  @Property()
  country: string;
}

@ModelOptions({ options: { allowMixed: Severity.ALLOW } })
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

  @Field(() => Float)
  @Property()
  avgRating: number;

  @Field(() => [Review])
  @Property()
  reviews: Review[];

  @Field(() => String)
  @Property({ required: true })
  hostId!: string;

  @Field(() => Address)
  @Property({ required: true })
  address!: Address;
}

export const ListingModel = getModelForClass(Listing, getSchemaOptions());
