import "../styles/globals.css";
import type { AppProps } from "next/app";
import TrackProvider from "../components/TrackContext";
import { Content, ScrollTop, Navigation } from "../components";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Content>
      <ScrollTop />
      <TrackProvider>
        <Navigation />
        <Component {...pageProps} />
      </TrackProvider>
    </Content>
  );
}
