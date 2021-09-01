import * as React from 'react';
import NavBar from 'components/navbar';
import Sidebar from 'components/sidebar';
import styled from 'styled-components';
import { GlobalStyle } from 'styles';
import ListView from 'components/listView';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

const StyledPage = styled.div`
    overflow: hidden;
    width: 100% !important;
`;

function ListPage() {

    const { user, isLoading } = useUser();

    React.useEffect(() => {
        
    })

    return (
        <StyledPage>
            <GlobalStyle />
            <NavBar />
            <Sidebar />
            <ListView />
        </StyledPage>
    )
}

export default withPageAuthRequired(ListPage, {
    onRedirecting: () => (<h1>Loading...</h1>),
    onError: () => (<h1>Error Occurred</h1>)
});