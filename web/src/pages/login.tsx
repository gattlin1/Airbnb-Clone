import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

function Login() {
  const router = useRouter();
  const [login] = useLoginMutation();

  return (
    <Formik
      initialValues={{ usernameOrEmail: '', password: '' }}
      onSubmit={async (values, { setErrors }) => {
        const response = await login({
          variables: values,
          update: (cache, { data }) => {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: 'Query',
                me: data?.login.user,
              },
            });
            cache.evict({ fieldName: 'posts:{}' });
          },
        });

        if (response.data?.login.errors) {
          //setErrors(toErrorMap(response.data.login.errors));
        } else if (response.data?.login.user) {
          if (typeof router.query.next === 'string') {
            router.push(router.query.next);
          } else {
            router.push('/');
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <div>
          {/* <InputField
            name='usernameOrEmail'
            label='Username or Email'
            placeholder='Username or Email'
          />
          <InputField
            name='password'
            label='Password'
            placeholder='Password'
            type='password'
          /> */}
          <button type='submit'>Login</button>
          <Link href='/forgot-password'>Forgot Password?</Link>
          <Link href='/register'>Don't have an account? Register here</Link>
        </div>
      )}
    </Formik>
  );
}

export default withApollo({ ssr: false })(Login);
