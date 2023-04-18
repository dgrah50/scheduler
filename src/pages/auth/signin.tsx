import { InferGetServerSidePropsType } from 'next';
import { CtxOrReq } from 'next-auth/client/_utils';
import { signIn, getCsrfToken, getProviders, useSession } from 'next-auth/react';
import Image from 'next/image';
// import { Discord } from 'iconoir-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Signin({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [router, status]);

  return (
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Image
              className="h-12 w-12"
              width={48}
              height={48}
              src="https://tailwindui.com/img/logos/mark.svg"
              alt="Your Company"
            />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8">
            <div>
              <div>
                <p className="text-sm font-medium leading-6 text-gray-900">Sign in with</p>

                <div className="mt-2 grid grid-cols-3 gap-3">
                  {providers &&
                    Object.values(providers).map((provider) => (
                      <div key={provider.name}>
                        <button
                          type="button"
                          onClick={() => signIn(provider.id, { callbackUrl: `/` })}
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {provider.name}
                          <span className="sr-only">{`Sign in with ${provider.name}`}</span>
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }} // optional
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
}

export default Signin;

export async function getServerSideProps(context: CtxOrReq) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
