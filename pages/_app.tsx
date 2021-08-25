import React from 'react';
import Router from 'next/router';
import nProgress from 'nprogress';
import AppContextProvider from '../contexts/AppContext';

// nProgress.configure({ showSpinner: true });

Router.events.on('routeChangeStart', () => {
    nProgress.start();
});

Router.events.on('routeChangeComplete', () => {
    nProgress.done();
});

Router.events.on('routeChangeError', () => {
    nProgress.done();
});

function App({ Component, pageProps }) {
    return (
        <AppContextProvider>
            <Component {...pageProps} />
        </AppContextProvider>
    )
}

export default App;
