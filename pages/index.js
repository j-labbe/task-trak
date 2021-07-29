import Head from 'next/head';
import styled from 'styled-components';
import { GlobalStyle } from '../styles';
import NavBar from '../components/navbar';

const StyledHome = styled.div`
`;

const Home = () => {
    return (
        <>
            <GlobalStyle />
            <Head>
                <title>Home</title>
            </Head>
            <NavBar />
            <h1>Home</h1>
        </>
    )
}

export default Home;