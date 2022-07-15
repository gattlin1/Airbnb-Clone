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
      <h2>{data?.listing.name}</h2>
      <img src={data?.listing.imageUrl} alt={data?.listing.name} />
      <div>
        {data?.listing.address.city}, {data?.listing.address.state}
      </div>
      <div>{data?.listing.description}</div>
    </div>
  );
}

export default withApollo({ ssr: true })(Listing);
