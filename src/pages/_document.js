import Document, { Html, Head, Main, NextScript,  } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
        scripts: (
          <script src="https://checkout.stripe.com/checkout.js" />
        )
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>{this.props.styles}</Head>
        <Head>{this.props.scripts}</Head>
        <body>
          <Main />
          <NextScript />
          <div id="portal" />
          <div id="fb-root" />
        </body>
      </Html>
    );
  }
}
