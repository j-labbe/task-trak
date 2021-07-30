import { useEffect, useContext } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { GlobalStyle } from '../styles';
import { mixins } from '../styles';
import Link from 'next/link';
import { AppContext } from '../contexts/AppContext';
import Loader from '../components/loader';

const StyledLanding = styled.div`
    ${mixins.flexCenter}
    flex-direction: column;

    h1 {
        font-size: clamp(50px, 25vw, 100px);
        margin-bottom: 0;
    }
    h3 {
        font-size: clamp(25px, 25vw, 50px);
    }
`;

const Hero = styled.div`
    min-height: 100vh;
    background-color: var(--secondary-bg);
`;

const Landing = () => {
    return (
        <div>
            <GlobalStyle />
            <Head>
                <title>Task Track - Tracker For All Your Tasks</title>
            </Head>
            <div id="landing">
                <StyledLanding>
                    <h1>Task Track</h1>
                    <h3>Your All-In-One Task Tracker</h3>
                    <Link href="/app">Visit the app</Link>
                </StyledLanding>
            </div>
        </div>
    )
}

export default Landing;