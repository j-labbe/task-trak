import { useEffect, useContext } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { mixins } from '../../styles';
import { GlobalStyle } from '../../styles';
import NavBar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import MyTasks from '../../components/myTasks';
import { AppContext } from '../../contexts/AppContext';
import Loader from '../../components/loader';

const StyledHome = styled.div`
    overflow: hidden;
    width: 100% !important;
`;

const StyledLoader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    ${mixins.flexCenter}
    z-index: 99;
    background-color: var(--default-bg);
`;

const Home = () => {

    const contextValue = useContext(AppContext);
    const { loading, setNotLoading } = contextValue;

    useEffect(() => {
        // if we load fast, keep the loader on screen
        // for a little bit so it doesn't flash
        const timeout = setTimeout(() => {
            setNotLoading();
        }, 100);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <StyledHome>
            <GlobalStyle />
            <Head>
                <title>Home</title>
            </Head>
            {loading ? (
                <>
                    <StyledLoader>
                        <Loader />
                    </StyledLoader>
                </>
            ) : ''}
            <NavBar />
            <SideBar />
            <MyTasks />
        </StyledHome>
    )
}

export default Home;