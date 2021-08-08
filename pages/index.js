import Head from 'next/head';
import styled from 'styled-components';
import { GlobalStyle } from '../styles';
import NavBar from '../components/navbar';

const StyledHome = styled.div`
`;

const Home = () => {
    let test = process.env.TEST_ENV_VAR ? process.env.TEST_ENV_VAR : 'failed';
    return (
        <>
            <GlobalStyle />
            <Head>
                <title>Home</title>
            </Head>
            <NavBar />
            <h1>Home</h1>
            <h3>Test: {test}</h3>
        </>
    )
}

export default Home;
