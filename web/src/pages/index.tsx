import type { NextPage } from 'next';
import { useListingsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

function Home() {
  const { data: listingData } = useListingsQuery({ variables: { limit: 15 } });
  console.log(listingData);
  return <div>Index</div>;
}

export default withApollo({ ssr: true })(Home);
