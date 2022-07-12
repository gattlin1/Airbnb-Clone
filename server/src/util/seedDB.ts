import { ListingModel } from '../models/listing';
import { mockListings } from './mockListings';

export async function seedListings() {
  const listings = mockListings.map(
    (listing: any) => new ListingModel({ ...listing })
  );
  await ListingModel.deleteMany({});
  for (let i = 0; i < listings.length; i++) {
    listings[i].save();
  }
}
