import App, {Container} from 'next/app';
import {Provider} from 'react-redux';
import {parseCookies} from 'nookies';

import withReduxStore from '../lib/with-redux-store';
import Layout from '../components/layout';

class CustomApp extends App {
    static async getInitialProps({Component, ctx}) {
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

        return {pageProps};
    }

    render() {
        const {Component, pageProps, reduxStore} = this.props;
        return (
            <Container>
                <Provider store={reduxStore}>
                    <Layout {...pageProps}>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </Container>
        );
    }
}

export default withReduxStore(CustomApp);
