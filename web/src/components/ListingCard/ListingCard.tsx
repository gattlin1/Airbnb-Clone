import React from 'react';
import { BasicListingInfoFragment } from '../../generated/graphql';

interface ListingCardProps {
  listing: BasicListingInfoFragment;
}

function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className='max-w-sm rounded-lg  overflow-hidden shadow-lg cursor-pointer h-full'>
      <img
        className='items-center object-cover w-full h-48'
        src={listing.imageUrl}
        alt={listing.name}
      />
      <div className='px-4 py-2'>
        <div className='font-bold text-lg mb-2'>{listing.name}</div>
        <div className='text-md mb-2'>
          {listing.address.city}, {listing.address.state}
        </div>
        <p className='text-gray-700 text-xs'>{listing.descriptionSnippet}</p>
      </div>
      <div className='px-6 pt-4 pb-2'>${listing.price} night</div>
    </div>
  );
}

export default ListingCard;
