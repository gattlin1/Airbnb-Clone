import { Field, Float, Int, ObjectType } from 'type-graphql';
import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { getSchemaOptions } from '../util/typegoose';

class Review {
  rating: number;
  comment: string;
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
  categories: string[];

  @Field()
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

  @Field(() => Review)
  @Property()
  reviews: Review[];
}

export const ListingModel = getModelForClass(Listing, getSchemaOptions());
