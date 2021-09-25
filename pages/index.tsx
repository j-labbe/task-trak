import { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { GlobalStyle } from '../styles';
import { mixins } from '../styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from 'next/link';
import Loading from 'components/loading';

interface StyledPageProps {
    isMounted: boolean
}

const StyledPage = styled.div<StyledPageProps>`
    opacity: ${props => props.isMounted ? `1` : `0`};
    transition: var(--transition);
`;

const StyledLanding = styled.div`
    ${mixins.flexCenter}
    flex-direction: column;
    background-color: var(--secondary-bg);
    height: 100%;

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
        background: rgb(97,11,239);
        background: linear-gradient(180deg, rgba(97,11,239,1) 0%, rgba(247,247,252,1) 100%);
        width: 100%;
        height: 70%;

        h1 {
            font-size: clamp(50px, 25vw, 100px);
            color: var(--default-bg);
            margin-bottom: 0;
            padding-top: 20px;
        }
        h3 {
            font-size: clamp(25px, 25vw, 50px);
            color: var(--default-bg);
        }
        .big-hero-btn {
            ${mixins.flexCenter}
            cursor: pointer;
            background-color: var(--red);
            width: 200px;
            padding: 10px;
            border-radius: var(--border-radius);
            color: var(--cf-white);
            animation: pulse-red 2s infinite;
            opacity: 1;
            transition: var(--transition);

            &:hover {
                opacity: 0.8;
                transition: var(--transition);
            }
        }
    }
`;

const StyledBody = styled.div`
    ${mixins.flexCenter}
    position: absolute;
    bottom: 5%;
`;

const Landing = () => {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    });

    return (
        <StyledPage isMounted={mounted}>
            <GlobalStyle />
            <Head>
                <title>Task Trak - Tracker For All Your Tasks</title>
            </Head>
            <div id="landing">
                <StyledLanding>
                    <div className="heroNav">
                        <Link href="/">
                            <a className="navLink">Home</a>
                        </Link>
                        {/* <Link href="/">
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
                        </Link> */}
                        <Link href="/app">
                            <a className="navLink">Check out the App</a>
                        </Link>
                    </div>
                    <div className="hero">
                        <h1>Task Trak</h1>
                        <h3>Simplify your To-Do List.</h3>
                        <Link href="/app">
                            <div className="big-hero-btn">Visit the app</div>
                        </Link>
                    </div>
                    <StyledBody>
                        <h2>Task Trak is actively in development. Check out the <a href="https://github.com/j-labbe/task-trak" target="_blank">GitHub!</a></h2>
                    </StyledBody>
                </StyledLanding>
            </div>
        </StyledPage>
    )
}

export default Landing;