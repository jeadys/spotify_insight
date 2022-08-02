import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Content, Navigation, ScrollTop } from "../components";
import TrackProvider from "../components/TrackContext";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session}>
          <div className="bg-gray-900 min-h-screen font-maven">
            <div className="min-h-screen">
              <Content>
                <ScrollTop />
                <TrackProvider>
                  <Navigation />
                  <div className="space-y-10">
                    <Component {...pageProps} />
                  </div>
                </TrackProvider>
              </Content>
              <ReactQueryDevtools initialIsOpen={false} />
            </div>
          </div>
          <div id="trackplayer"></div>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
