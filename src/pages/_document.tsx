import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:title" content="title goes here" key="title" />
        <link rel="icon" sizes="32x32" href="/swish-icon.png"></link>
      </Head>{" "}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
