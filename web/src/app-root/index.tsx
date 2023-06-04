import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { QueryClientProvider, QueryClient, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { Processes } from './processes';
import { storeWrapper } from './store';

function App({ Component, ...rest }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const {
    store,
    props: { pageProps },
  } = storeWrapper.useWrappedStore(rest);

  return (
    <>
      <Head>
        <title>Createx</title>
        <meta name="description" content="some desc...." />
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Processes>
              <Component {...pageProps} />
            </Processes>
            <ReactQueryDevtools />
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
