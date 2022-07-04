import { Listing } from '../models/listing';
import { Query, Resolver, Arg } from 'type-graphql';

@Resolver(Listing)
export class ListingResolver {
  @Query(() => [Listing])
  listings(
    @Arg('category', () => String, { nullable: true }) category: string
  ) {}

  @Query(() => [Listing])
  listing(@Arg('id', () => String) id: string) {}
}
