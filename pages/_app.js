import React from 'react';
import Router from 'next/router';
import nProgress from 'nprogress';

// nProgress.configure({ showSpinner: true });

Router.onRouteChangeStart = () => {
    console.log('router change started');
    nProgress.start();
};

Router.onRouteChangeComplete = () => {
    console.log('router change success');
    nProgress.done();
};

Router.onRouteChangeError = () => {
    console.log('router change error');
    nProgress.done();
};

function MyApp({ Component, pageProps }) {
    return (
        <Component {...pageProps} />
    )
}

export default MyApp
