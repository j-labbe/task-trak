import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Nav from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import ProjectMgmtPage from "./pages/App/Projects";
import NotFound from './pages/NotFound';
import Project from './pages/App/Project';
import Footer from './components/Footer';
import config from "./config";
import AppHome from './pages/App/Home';
import LandingPage from './pages/LandingPage';

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
        <ApolloProvider client={client}>
            <Router>
                <ChakraProvider theme={theme}>
                    <Nav />
                    <Routes>
                        <Route path={config.routes.root} element={<LandingPage />} />
                        <Route path={config.routes.app.root} element={<AppHome />} />
                        <Route path={config.routes.projectMgmt.root} element={<ProjectMgmtPage />} />
                        <Route path={config.routes.projectMgmt.project} element={<Project />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </ChakraProvider>
            </Router>
        </ApolloProvider>
    );
}

export default App;
