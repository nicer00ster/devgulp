import App from 'next/app';
import { Provider } from 'react-redux';
import { parseCookies } from 'nookies';
import * as Sentry from '@sentry/browser';
import AppProvider from '../components/kit/notifications/provider';
import withReduxStore from '../lib/with-redux-store';
import Layout from '../components/layout';

Sentry.init({
  dsn: 'https://1f35ab3d6bcd425cb1d3cf43aa31cdfa@sentry.io/1839581',
  beforeSend(event, hint) {
    if (event.exception) {
      Sentry.showReportDialog({
        eventId: event.event_id,
        title: 'Submit an issue',
        labelSubmit: 'Submit',
      });
    }
    return event;
  },
});

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const token = parseCookies(ctx)._app;

    if (token) {
      pageProps.cookie = token;
    } else {
      pageProps.cookie = null;
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <AppProvider>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </Provider>
    );
  }
}

export default withReduxStore(CustomApp);
