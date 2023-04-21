import { Button } from '@/components/ui/button';
import { InferGetServerSidePropsType } from 'next';
import { CtxOrReq } from 'next-auth/client/_utils';
import { signIn, getCsrfToken, getProviders, useSession } from 'next-auth/react';
import { IoLogoDiscord, IoLogoFacebook, IoLogoGoogle } from 'react-icons/io5';
import { IconType } from 'react-icons';

// import { Discord } from 'iconoir-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const iconMap: {
  [key: string]: IconType;
} = {
  Discord: IoLogoDiscord,
  Facebook: IoLogoFacebook,
  Google: IoLogoGoogle,
};

function Signin({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [router, status]);

  return (
    <div className="flex h-screen min-h-full w-screen items-center justify-center ">
      <div className="flex flex-1 flex-col justify-center rounded-lg border py-12 text-card-foreground shadow-sm shadow-sm sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="text-1xl mt-6 pb-0 text-center font-bold tracking-tight text-muted-foreground">
              gpthbd.com
            </h2>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8">
            <div>
              <div>
                <div className="text-semibold mt-2 flex justify-between  text-white">
                  {providers &&
                    Object.values(providers).map((provider) => (
                      <div key={provider.name}>
                        <Button
                          variant="outline"
                          className="flex gap-2"
                          onClick={() => signIn(provider.id, { callbackUrl: `/` })}
                        >
                          {iconMap[provider.name]?.({
                            size: 16,
                          })}
                          {provider.name}
                          <span className="sr-only ">{`Sign in with ${provider.name}`}</span>
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
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
