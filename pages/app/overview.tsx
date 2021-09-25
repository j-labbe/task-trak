import { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';
import NavBar from '../../components/navbar';
import SideBar from '../../components/sidebar';

const StyledHome = styled.div`
    overflow: hidden;
    width: 100% !important;
`;

const Home = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // if we load fast, keep the loader on screen
        // for a little bit so it doesn't flash
        const timeout = setTimeout(() => {
            setIsMounted(true);
        }, 100);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div>
            {isMounted ? (
                <StyledHome>
                    <GlobalStyle />
                    <Head>
                        <title>Home - TaskTrak</title>
                    </Head>
                    <NavBar />
                    <SideBar />
                </StyledHome>
            ) : ''}
        </div>
    )
}

export default Home;