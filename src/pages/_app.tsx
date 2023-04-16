import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '~/utils/api';

import '~/styles/globals.css';

// eslint-disable-next-line react/function-component-definition
const MyApp: AppType<{ session: Session | null }> = ({
  // eslint-disable-next-line react/prop-types
  Component,
  // eslint-disable-next-line react/prop-types
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
);

export default api.withTRPC(MyApp);
