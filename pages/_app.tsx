import React from 'react';
import Router from 'next/router';
import nProgress from 'nprogress';
import AppContext, { AppContextProvider } from '../contexts/AppContext';
import { UserProvider } from '@auth0/nextjs-auth0';
import DynamicDndProvider from 'components/DynamicDndProvider';

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

const context = new AppContext();

function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <AppContextProvider contextState={context}>
                <DynamicDndProvider>
                    <Component {...pageProps} />
                </DynamicDndProvider>
            </AppContextProvider>
        </UserProvider>
    )
}

export default App;
