import { InMemoryCache, ApolloClient } from '@apollo/client';
import { withApollo as createWithApollo } from 'next-apollo';
import { PaginatedListing } from '../generated/graphql';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: [],
          merge(
            existing: PaginatedListing | undefined,
            incoming: PaginatedListing
          ): PaginatedListing {
            return {
              ...incoming,
              listings: [...(existing?.listings || []), ...incoming.listings],
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // process.env.NEXT_PUBLIC_API_URL as string,
  cache,
  credentials: 'include',
});

export const withApollo = createWithApollo(client);
