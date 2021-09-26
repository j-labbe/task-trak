import * as React from 'react';
import NavBar from 'components/navbar';
import Sidebar from 'components/sidebar';
import styled from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';
import ListView from 'components/interfaces/listView';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Loading from 'components/loading';

const StyledPage = styled.div`
    overflow: hidden;
    width: 100% !important;
`;

function ListPage() {

    const { user } = useUser();

    return user && (
        <StyledPage>
            <GlobalStyle />
            <NavBar />
            <Sidebar />
            <ListView />
        </StyledPage>
    )
}

export default withPageAuthRequired(ListPage, {
    onRedirecting: function onRedirecting() { return <Loading /> },
    onError: function onError() { return <h1>Error Occurred</h1> }
});