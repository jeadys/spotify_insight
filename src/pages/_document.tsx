import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg-gray-900 min-h-screen font-maven">
        <Main />
        <div id="trackplayer"></div>
        <NextScript />
      </body>
    </Html>
  );
}
