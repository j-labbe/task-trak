import React from 'react';
import Router from 'next/router';
import nProgress from 'nprogress';
import AppContextProvider, { AppContext } from '../contexts/AppContext';

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
        <AppContextProvider>
            <Component {...pageProps} />
        </AppContextProvider>
    )
}

export default MyApp
