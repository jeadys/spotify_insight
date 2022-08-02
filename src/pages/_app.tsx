import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import TrackProvider from "../components/TrackContext";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Content, ScrollTop, Navigation } from "../components";

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
