import ListingCard from '../components/ListingCard/ListingCard';
import { useListingsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const Index = () => {
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

  return (
    <div className='grid gap-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2'>
      {listings}
    </div>
  );
};

export default withApollo({ ssr: true })(Index);
