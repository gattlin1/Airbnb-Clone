import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField/InputField';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { toErrorMap } from '../utils/toErrorMap';

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
            cache.evict({ fieldName: 'listings:{}' });
          },
        });

        if (response.data?.login.errors) {
          setErrors(toErrorMap(response.data.login.errors));
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
        <div className='w-full items-center flex flex-col'>
          <div>
            <InputField
              name='usernameOrEmail'
              label='Username or Email'
              placeholder='Username or Email'
            />
            <InputField
              name='password'
              label='Password'
              placeholder='Password'
              type='password'
            />
            <button
              type='submit'
              className='bg-teal-800 p-2 text-white rounded mr-2'
            >
              Login
            </button>
            <span className='flex flex-col'>
              <span className='text-sm hover:underline'>
                <Link href='/forgot-password'>Forgot Password?</Link>
              </span>
              <span className='text-sm hover:underline'>
                <Link href='/register'>
                  Don't have an account? Register here
                </Link>
              </span>
            </span>
            <div></div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default withApollo({ ssr: false })(Login);
