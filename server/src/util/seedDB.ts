import { ListingModel } from '../models/listing';
import { mockListings } from './mockListings';

export async function seedListings() {
  const listings = mockListings.map(
    (listing: any) => new ListingModel({ ...listing })
  );
  await ListingModel.deleteMany({});
  for (let i = 0; i < listings.length; i++) {
    let sum = 0;
    listings[i].reviews.forEach((review) => {
      sum += review.rating;
    });
    listings[i].avgRating = sum / listings[i].reviews.length;

    listings[i].save();
  }
}
