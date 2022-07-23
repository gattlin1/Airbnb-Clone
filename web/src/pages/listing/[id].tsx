import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useListingQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';

function Listing() {
  const router = useRouter();

  let listingId = '';
  if (typeof router.query.id === 'string') {
    listingId = router.query.id;
  }
  const { data, loading, error } = useListingQuery({
    variables: { listingId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <div>There was an error loading the listing.</div>
        <i className='fa-solid fa-arrow-left mr-2'></i>
        <Link href='/'>
          <span className='cursor-pointer'>Return home</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className='text-4xl'>{data?.listing.name}</h2>
      <div className='font-light text-sm mb-2'>
        {data?.listing.address.city}, {data?.listing.address.state},{' '}
        {data?.listing.address.country}
      </div>
      <div className='w-full flex justify-center mb-2'>
        <img
          src={data?.listing.imageUrl}
          alt={data?.listing.name}
          className='object-cover'
        />
      </div>

      <div>
        <ul className='font-extralight'>
          <li className='inline-block mr-1'>
            <span>{data?.listing.recommendedGuestCount} guests</span>
          </li>
          <li className='inline-block mr-1'>
            <span>· {data?.listing.bedrooms} bedrooms</span>
          </li>
          <li className='inline-block mr-1'>
            <span>· {data?.listing.beds} beds</span>
          </li>
          <li className='inline-block mr-1'>
            <span>· {data?.listing.baths} baths</span>
          </li>
        </ul>
        <hr className='mt-2 mb-4' />
        <div>
          <div className='font-medium text-xl'>Amenities</div>
          {data?.listing.amenities.map((amenity, i) => (
            <div key={i} className='font-light text-sm mb-2'>
              {amenity}
            </div>
          ))}
        </div>
        <hr className='mt-4 mb-4' />
        <div>
          <div className='font-medium text-xl'>Description</div>
          <div className='font-light text-sm'>{data?.listing.description}</div>
        </div>
        <hr className='mt-4 mb-4' />
      </div>
      <div>
        <div className='font-medium text-xl mb-2'>Reviews</div>
        {data?.listing.reviews.length ? (
          <div>
            <i className='fa-solid fa-star'></i> {data.listing.avgRating} ·{' '}
            {data.listing.reviews.length} review
            {data.listing.reviews.length > 1 && 's'}
          </div>
        ) : (
          <div>No Reviews Yet</div>
        )}
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-1 mt-2'>
          {data?.listing.reviews.map((review, i) => (
            <div key={i} className='font-light mb-2'>
              <div className='flex'>
                <div className='flex-grow'>{review.title} </div>
                <span className=''>
                  {review.rating} <i className='fa-solid fa-star'></i>
                </span>
              </div>
              <div className='text-sm'>{review.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withApollo({ ssr: false })(Listing);
