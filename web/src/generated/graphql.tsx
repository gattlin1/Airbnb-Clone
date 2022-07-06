import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
  street: Scalars['String'];
  zip: Scalars['String'];
};

export type AddressInput = {
  city: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
  street: Scalars['String'];
  zip: Scalars['String'];
};

export type CredentialsInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Listing = {
  __typename?: 'Listing';
  _id: Scalars['String'];
  address: Address;
  amenities: Array<Scalars['String']>;
  baths: Scalars['Float'];
  bedrooms: Scalars['Int'];
  beds: Scalars['Int'];
  category: Scalars['String'];
  description: Scalars['String'];
  hostId: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  recommendedGuestCount: Scalars['Int'];
  reviews: Array<Review>;
};

export type ListingInput = {
  address: AddressInput;
  amenities: Array<Scalars['String']>;
  baths: Scalars['Float'];
  bedrooms: Scalars['Int'];
  beds: Scalars['Int'];
  category: Scalars['String'];
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  recommendedGuestCount: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createListing?: Maybe<Listing>;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationCreateListingArgs = {
  input: ListingInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  credentials: CredentialsInput;
};

export type PaginatedListing = {
  __typename?: 'PaginatedListing';
  hasMore: Scalars['Boolean'];
  listings: Array<Listing>;
};

export type Query = {
  __typename?: 'Query';
  listing: Listing;
  listings: PaginatedListing;
  me?: Maybe<User>;
  users: Array<User>;
};


export type QueryListingArgs = {
  id: Scalars['String'];
};


export type QueryListingsArgs = {
  category?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type Review = {
  __typename?: 'Review';
  comment: Scalars['String'];
  rating: Scalars['Float'];
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type ListingInfoFragment = { __typename?: 'Listing', _id: string, name: string, description: string, category: string, amenities: Array<string>, price: number, recommendedGuestCount: number, beds: number, bedrooms: number, baths: number, imageUrl: string, hostId: string, reviews: Array<{ __typename?: 'Review', rating: number, comment: string, userId: string }>, address: { __typename?: 'Address', street: string, city: string, country: string, zip: string, state: string } };

export type CreateListingMutationVariables = Exact<{
  input: ListingInput;
}>;


export type CreateListingMutation = { __typename?: 'Mutation', createListing?: { __typename?: 'Listing', _id: string, name: string, description: string, category: string, amenities: Array<string>, price: number, recommendedGuestCount: number, beds: number, bedrooms: number, baths: number, imageUrl: string, hostId: string, reviews: Array<{ __typename?: 'Review', rating: number, comment: string, userId: string }>, address: { __typename?: 'Address', street: string, city: string, country: string, zip: string, state: string } } | null };

export type ListingQueryVariables = Exact<{
  listingId: Scalars['String'];
}>;


export type ListingQuery = { __typename?: 'Query', listing: { __typename?: 'Listing', _id: string, name: string, description: string, category: string, amenities: Array<string>, price: number, recommendedGuestCount: number, beds: number, bedrooms: number, baths: number, imageUrl: string, hostId: string, reviews: Array<{ __typename?: 'Review', rating: number, comment: string, userId: string }>, address: { __typename?: 'Address', street: string, city: string, country: string, zip: string, state: string } } };

export type ListingsQueryVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type ListingsQuery = { __typename?: 'Query', listings: { __typename?: 'PaginatedListing', hasMore: boolean, listings: Array<{ __typename?: 'Listing', _id: string, name: string, description: string, category: string, amenities: Array<string>, price: number, recommendedGuestCount: number, beds: number, bedrooms: number, baths: number, imageUrl: string, hostId: string, reviews: Array<{ __typename?: 'Review', rating: number, comment: string, userId: string }>, address: { __typename?: 'Address', street: string, city: string, country: string, zip: string, state: string } }> } };

export const ListingInfoFragmentDoc = gql`
    fragment ListingInfo on Listing {
  _id
  name
  description
  category
  amenities
  price
  recommendedGuestCount
  beds
  bedrooms
  baths
  imageUrl
  reviews {
    rating
    comment
    userId
  }
  hostId
  address {
    street
    city
    country
    zip
    state
  }
}
    `;
export const CreateListingDocument = gql`
    mutation CreateListing($input: ListingInput!) {
  createListing(input: $input) {
    ...ListingInfo
  }
}
    ${ListingInfoFragmentDoc}`;
export type CreateListingMutationFn = Apollo.MutationFunction<CreateListingMutation, CreateListingMutationVariables>;

/**
 * __useCreateListingMutation__
 *
 * To run a mutation, you first call `useCreateListingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListingMutation, { data, loading, error }] = useCreateListingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateListingMutation(baseOptions?: Apollo.MutationHookOptions<CreateListingMutation, CreateListingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateListingMutation, CreateListingMutationVariables>(CreateListingDocument, options);
      }
export type CreateListingMutationHookResult = ReturnType<typeof useCreateListingMutation>;
export type CreateListingMutationResult = Apollo.MutationResult<CreateListingMutation>;
export type CreateListingMutationOptions = Apollo.BaseMutationOptions<CreateListingMutation, CreateListingMutationVariables>;
export const ListingDocument = gql`
    query Listing($listingId: String!) {
  listing(id: $listingId) {
    ...ListingInfo
  }
}
    ${ListingInfoFragmentDoc}`;

/**
 * __useListingQuery__
 *
 * To run a query within a React component, call `useListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingQuery({
 *   variables: {
 *      listingId: // value for 'listingId'
 *   },
 * });
 */
export function useListingQuery(baseOptions: Apollo.QueryHookOptions<ListingQuery, ListingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListingQuery, ListingQueryVariables>(ListingDocument, options);
      }
export function useListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListingQuery, ListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListingQuery, ListingQueryVariables>(ListingDocument, options);
        }
export type ListingQueryHookResult = ReturnType<typeof useListingQuery>;
export type ListingLazyQueryHookResult = ReturnType<typeof useListingLazyQuery>;
export type ListingQueryResult = Apollo.QueryResult<ListingQuery, ListingQueryVariables>;
export const ListingsDocument = gql`
    query Listings($limit: Int!) {
  listings(limit: $limit) {
    listings {
      ...ListingInfo
    }
    hasMore
  }
}
    ${ListingInfoFragmentDoc}`;

/**
 * __useListingsQuery__
 *
 * To run a query within a React component, call `useListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListingsQuery(baseOptions: Apollo.QueryHookOptions<ListingsQuery, ListingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListingsQuery, ListingsQueryVariables>(ListingsDocument, options);
      }
export function useListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListingsQuery, ListingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListingsQuery, ListingsQueryVariables>(ListingsDocument, options);
        }
export type ListingsQueryHookResult = ReturnType<typeof useListingsQuery>;
export type ListingsLazyQueryHookResult = ReturnType<typeof useListingsLazyQuery>;
export type ListingsQueryResult = Apollo.QueryResult<ListingsQuery, ListingsQueryVariables>;