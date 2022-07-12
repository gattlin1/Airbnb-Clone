import type { NextPage } from 'next';
import ListingCard from '../components/ListingCard/ListingCard';
import { useListingsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

function Home() {
  const { data } = useListingsQuery({ variables: { limit: 15 } });
  let listings = null;
  if (data?.listings?.listings) {
    listings = data.listings.listings.map((listing) => (
      <div key={listing._id}>
        <ListingCard listing={listing} />
      </div>
    ));
  } else {
    listings = <div>...Loading</div>;
  }

  return <div className=''>{listings}</div>;
}

export default withApollo({ ssr: true })(Home);
