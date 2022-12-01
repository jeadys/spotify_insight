import React from 'react'

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

import { Content, Navigation, ScrollTop } from '../components/core'
import TrackProvider from '../components/core/TrackContext'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session}>
          <Content>
            <ScrollTop />
            <TrackProvider>
              <Navigation />
              <div className="space-y-10">
                <Component {...pageProps} />
              </div>
            </TrackProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </Content>
          <div id="trackplayer"></div>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
