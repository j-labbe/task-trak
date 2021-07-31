import { useState, useEffect } from "react";
import styled from "styled-components";
import { mixins } from "../styles";
import FakeLogo from "../assets/images/fakelogo.svg";
import Image from 'next/image';
import { useRouter } from "next/router";
import { IconFeed, IconGrid } from "../assets/images";
import Link from 'next/link';
import ReactTooltip from "react-tooltip";


const StyledSideBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    ${mixins.flexCenter}
    justify-content: start;
    flex-direction: column;
    padding-top: 20px;
    height: 100%;
    width: var(--sidenav-width);
    background-color: var(--default-bg);
    max-width: var(--sidenav-width);
    overflow: hidden;
    border: 2px solid var(--secondary-bg);

    .colorActive {
        color: var(--primary-accent) !important;
    }

    .colorNot {
        color: var(--cf-label) !important;
    }

    .logo {
        margin-bottom: 40px;
    }

    a{
        transition: var(--transition);
        margin: 10px 0;
    }

    a:visited,
    a:focus {
        color: inherit;
    }

    a:hover {
        opacity: 0.7;
        transition: var(--transition);
    }
`;

const SideBar = () => {

    const [isMounted, setIsMounted] = useState(false);

    const pathname = useRouter().pathname;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div id="sidebar">
                {isMounted ? (
                    <StyledSideBar>
                        <div className="logo">
                            <Image src={FakeLogo} height="48" width="48" />
                        </div>
                        <Link href="/app" className="nextLink">
                            <a className=
                                {
                                    (pathname === '/app')
                                        || (pathname === '/app/')
                                        ? 'colorActive' : 'colorNot'
                                } data-tip="Overview of all your tasks">
                                <IconGrid />
                            </a>
                        </Link>
                        <Link href="/app/task" className="nextLink">
                            <a className=
                                {
                                    (pathname === '/app/task')
                                        || (pathname === '/app/task')
                                        ? 'colorActive' : 'colorNot'
                                } data-tip="Details about individual tasks">
                                <IconFeed />
                            </a>
                        </Link>
                        <ReactTooltip delayShow={400} place="top" type="dark" effect="solid" />
                    </StyledSideBar>
                ) : ''}
        </div>
    )
};

export default SideBar;