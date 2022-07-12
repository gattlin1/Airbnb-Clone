import React from 'react';
import { Listing } from '../../generated/graphql';

interface ListingCardProps {
  listing: Listing;
}

function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className='max-w-sm rounded-lg  overflow-hidden shadow-lg cursor-pointer'>
      <img
        className='items-center object-cover h-full w-full'
        src={listing.imageUrl}
        alt={listing.name}
      />
      <div className='px-4 py-2'>
        <div className='font-bold text-lg mb-2'>{listing.name}</div>
        <div className='text-md mb-2'>
          {listing.address.city}, {listing.address.state}
        </div>
        <p className='text-gray-700 text-xs'>{listing.description}</p>
      </div>
      <div className='px-6 pt-4 pb-2'>${listing.price} night</div>
    </div>
  );
}

export default ListingCard;