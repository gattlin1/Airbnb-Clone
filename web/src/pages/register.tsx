import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField/InputField';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { toErrorMap } from '../utils/toErrorMap';

function Register() {
  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      onSubmit={async (values, { setErrors }) => {
        console.log('submitting');
        const response = await register({
          variables: { credentials: values },
          update: (cache, { data }) => {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: 'Query',
                me: data?.register.user,
              },
            });
            cache.evict({ fieldName: 'listings:{}' });
          },
        });

        if (response.data?.register.errors) {
          console.log(response);
          setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.register.user) {
          if (typeof router.query.next === 'string') {
            router.push(router.query.next);
          } else {
            router.push('/');
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className='w-full items-center flex flex-col'>
            <div>
              <InputField
                name='username'
                label='Username'
                placeholder='Username...'
              />
              <InputField name='email' label='Email' placeholder='Email...' />
              <InputField
                name='password'
                label='Password'
                placeholder='Password...'
                type='password'
              />
              <button
                type='submit'
                className='bg-teal-800 p-2 text-white rounded mr-2 w-24'
                disabled={isSubmitting}
              >
                Sign Up
              </button>
              <span className='flex flex-col'>
                <span className='text-sm hover:underline'>
                  <Link href='/register'>
                    Already have an account? Login here
                  </Link>
                </span>
              </span>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default withApollo({ ssr: false })(Register);
