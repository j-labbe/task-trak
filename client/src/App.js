import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Nav from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from "./pages/Home";
import NotFound from './pages/NotFound';
import Project from './pages/Project';
import Footer from './components/Footer';

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
    uri: 'http://localhost:5000/graphql',
    cache
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <ChakraProvider theme={theme}>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/project/:id" element={<Project />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </ChakraProvider>
            </Router>
        </ApolloProvider>
    );
}

export default App;
