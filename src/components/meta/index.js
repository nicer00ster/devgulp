import Head from "next/head";

function Meta() {
  return (
    <Head>
      <title>DevGulp</title>
      <meta charSet="utf-8" />
      <meta name="title" content="DevGulp" />
      <meta
        name="description"
        content="A community built for developers, by developers"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#1f222e" />
      <meta name="msapplication-TileColor" content="#1f222e" />
      <meta property="og:title" content="DevGulp" />
      <meta
        property="og:description"
        content="A community built for developers, by developers"
      />
      <meta
        property="og:image"
        content="https://devgulp.com/static/thumbnail.png"
      />
      <meta property="og:url" content="https://devgulp.com/" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://devgulp.com/" />
      <meta property="twitter:title" content="DevGulp" />
      <meta
        property="twitter:description"
        content="A community built for developers, by developers"
      />
      <meta
        property="twitter:image"
        content="https://devgulp.com/static/thumbnail.png"
      />
      <meta property="og:site_name" content="DevGulp" />
      <meta name="twitter:image:alt" content="DevGulp" />
      {/*<link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#1f222e" />*/}
      {/*<link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />*/}
      {/*<link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />*/}
      {/*<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />*/}
      {/*<link rel="icon" href="/static/favicon.ico" type="image/x-icon" />*/}
      {/*<link rel="manifest" href="/static/site.webmanifest" />*/}
      <link
        rel="preload"
        href="/static/fonts/Blinker.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="true"
      />
      <link
        rel="preload"
        href="/static/fonts/Trirong.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="true"
      />
      <link rel="preload" as="style" href="/static/nprogress.css" />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      <link
        rel="preload"
        as="style"
        href="/static/icons/fontawesome/all.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="/static/icons/fontawesome/all.min.css"
      />
    </Head>
  );
}

export default Meta;
