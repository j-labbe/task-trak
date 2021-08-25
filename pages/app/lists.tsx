import * as React from 'react';
import NavBar from 'components/navbar';
import Sidebar from 'components/sidebar';
import styled from 'styled-components';
import { GlobalStyle } from 'styles';

const StyledPage = styled.div`
    overflow: hidden;
    width: 100% !important;
`;

export default function ListPage() {

    return (
        <StyledPage>
            <GlobalStyle />
            <NavBar />
            <Sidebar />
        </StyledPage>
    )
}