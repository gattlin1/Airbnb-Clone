import { Address, Listing, ListingModel } from '../models/listing';
import {
  Query,
  Resolver,
  Arg,
  Mutation,
  InputType,
  Field,
  Int,
  Float,
  Ctx,
  ObjectType,
} from 'type-graphql';
import { MyContext } from '../types';

@InputType()
class AddressInput implements Partial<Address> {
  @Field()
  street!: string;

  @Field()
  city!: string;

  @Field()
  state!: string;

  @Field()
  zip!: string;

  @Field()
  country!: string;
}

@InputType()
class ListingInput implements Partial<Listing> {
  @Field()
  name!: string;

  @Field()
  description: string;

  @Field()
  category: string;

  @Field(() => [String])
  amenities: string[];

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  recommendedGuestCount: number;

  @Field(() => Int)
  bedrooms: number;

  @Field(() => Int)
  beds: number;

  @Field(() => Float)
  baths: number;

  @Field()
  imageUrl: string;

  @Field(() => AddressInput)
  address!: AddressInput;
}

@ObjectType()
class PaginatedListing {
  @Field(() => [Listing])
  listings: Listing[];
  @Field()
  hasMore: boolean;
}

// Come back and do paginated loading later
@Resolver(Listing)
export class ListingResolver {
  @Query(() => PaginatedListing)
  async listings(
    @Arg('category', () => String, { nullable: true }) category: string,
    @Arg('limit', () => Int) limit: number
  ): Promise<PaginatedListing> {
    const realLimit = Math.min(30, limit);
    const realLimitPlusOne = realLimit + 1;

    const listings = await ListingModel.find({}).limit(realLimitPlusOne).exec();

    console.log(category);
    console.log(listings);
    return {
      listings: listings.slice(0, realLimit),
      hasMore: listings.length === realLimitPlusOne,
    };
  }

  @Query(() => Listing)
  async listing(@Arg('id', () => String) id: string): Promise<Listing | null> {
    return await ListingModel.findById(id).exec();
  }

  @Mutation(() => Listing, { nullable: true })
  async createListing(
    @Arg('input') input: ListingInput,
    @Ctx() { req }: MyContext
  ): Promise<Listing | null> {
    return await ListingModel.create({
      ...input,
      hostId: req.session.userId,
    });
  }
}
