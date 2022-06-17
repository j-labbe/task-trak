import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Nav from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import ProjectMgmtPage from "./pages/App/Projects";
import NotFound from './pages/NotFound';
import Project from './pages/App/Project';
import config from "./config";
import AppHome from './pages/App/Home';
import LandingPage from './pages/LandingPage';
import { Auth0Provider } from "@auth0/auth0-react";
import SettingsPage from './pages/Settings';
import { NavProvider } from './contexts/NavConfig';
import Onboarding from './pages/App/Onboarding';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                }
            }
        }
    }
});

const client = new ApolloClient({
    uri: config.db.uri,
    cache
});

function App() {
    return (
        <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
            <ApolloProvider client={client}>
                <NavProvider>
                    <Router>
                        <ChakraProvider theme={theme}>
                            <Nav />
                            <Routes>
                                <Route path={config.routes.root} element={<LandingPage />} />
                                <Route path={config.routes.onboarding.root} element={<Onboarding />} />
                                <Route path={config.routes.app.root} element={<AppHome />} />
                                <Route path={config.routes.projectMgmt.root} element={<ProjectMgmtPage />} />
                                <Route path={`${config.routes.projectMgmt.project}/:id`} element={<Project />} />
                                <Route path={config.routes.settings} element={<SettingsPage />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </ChakraProvider>
                    </Router>
                </NavProvider>
            </ApolloProvider>
        </Auth0Provider>
    );
}

export default App;
