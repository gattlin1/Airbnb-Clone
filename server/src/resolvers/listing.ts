import { Address, Listing, ListingModel, Review } from '../models/listing';
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
  FieldResolver,
  Root,
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

@InputType()
class ReviewInput implements Partial<Review> {
  @Field()
  rating: number;

  @Field()
  comment: string;
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
  @FieldResolver(() => String)
  descriptionSnippet(@Root() root: any) {
    if (root.description.length > 50) {
      return root.description.slice(0, 47) + '...';
    }
    return root.description;
  }

  @Query(() => PaginatedListing)
  async listings(
    @Arg('limit', () => Int) limit: number
  ): Promise<PaginatedListing> {
    const realLimit = Math.min(30, limit);
    const realLimitPlusOne = realLimit + 1;
    const listings = await ListingModel.find({}).limit(realLimitPlusOne).exec();

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

  @Mutation(() => Listing)
  async createReview(
    @Arg('id', () => String) id: string,
    @Arg('review') review: ReviewInput,
    @Ctx() { req }: MyContext
  ): Promise<Listing | null> {
    const listing = await ListingModel.findById(id);

    if (!listing) {
      return null;
    }

    // In case a rating is out of the 0 - 5 limit.
    review.rating = Math.max(review.rating, 0);
    review.rating = Math.min(review.rating, 5);

    const newRating =
      (listing.avgRating * listing.reviews.length + review.rating) /
      (listing.reviews.length + 1);

    listing.avgRating = newRating;
    listing.reviews.push({ ...review, userId: req.session.userId } as Review);

    return await listing.save();
  }
}
