import { useState, useEffect } from "react";
import styled from "styled-components";
import { mixins } from "../styles";
import { useRouter } from "next/router";
import { IconAlignLeft, IconFeed, IconGrid } from "../assets/images";
import Link from 'next/link';
import ReactTooltip from "react-tooltip";
import TaskTrakLogo from "assets/images/logo";

const StyledSideBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
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
                            <TaskTrakLogo />
                        </div>
                        <Link href="/app">
                            <a className=
                            {
                                (pathname === '/app' || pathname === '/app/')
                                ? 'colorActive' : 'colorNot'
                            } data-tip="View your task progression">
                                <IconAlignLeft />
                            </a>
                        </Link>
                        <Link href="/app/overview">
                            <a className=
                                {
                                    (pathname === '/app/overview')
                                        || (pathname === '/app/overview/')
                                        ? 'colorActive' : 'colorNot'
                                } data-tip="Overview of your tasks in a grid">
                                <IconGrid />
                            </a>
                        </Link>
                        <Link href="/app/task">
                            <a className=
                                {
                                    (pathname.match(/^(\/app\/task\/?)([0-9]+)?$/gi)?true:false)
                                        ? 'colorActive' : 'colorNot'
                                } data-tip="Details about individual tasks">
                                <IconFeed />
                            </a>
                        </Link>
                        <ReactTooltip delayShow={400} place="top" type="dark" effect="solid" />
                    </StyledSideBar>
    ) : ''
}
        </div >
    )
};

export default SideBar;