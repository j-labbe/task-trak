import { useEffect, useContext } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { GlobalStyle } from '../styles';
import { mixins } from '../styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from 'next/link';

const StyledLanding = styled.div`
    ${mixins.flexCenter}
    flex-direction: column;

    .heroNav {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        ${mixins.flexCenter}
        justify-content: flex-end;
        width: 100%;
        height: 100px;
        padding: 20px;
        color: var(--default-bg);
        z-index: 1;

        .navLink {
            color: var(--default-bg);
            text-decoration: none;
            margin: 25px;
        }

    }

    .hero {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        ${mixins.flexCenter}
        flex-direction: column;
        justify-content: flex-start;
        background-color: var(--primary-accent);
        width: 100%;
        height: 80%;

        h1 {
            font-size: clamp(50px, 25vw, 100px);
            color: var(--default-bg);
            margin-bottom: 0;
        }
        h3 {
            font-size: clamp(25px, 25vw, 50px);
            color: var(--default-bg);
        }
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
                    <div className="heroNav">
                        <Link href="/">
                            <a className="navLink">Home</a>
                        </Link>
                        <Link href="/">
                            <a className="navLink">About</a>
                        </Link>
                        <Link href="/">
                            <a className="navLink">Features</a>
                        </Link>
                        <Link href="/">
                            <a className="navLink">FAQs</a>
                        </Link>
                        <Link href="/">
                            <a className="navLink button">Start Now</a>
                        </Link>
                    </div>
                    <div className="hero">
                        <h1>Task Track</h1>
                        <h3>Your All-In-One Task Tracker</h3>
                        <Link href="/app">Visit the app</Link>
                    </div>
                </StyledLanding>
            </div>
        </div>
    )
}

export default Landing;