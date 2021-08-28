import { useState, useEffect } from "react";
import styled from "styled-components";
import { mixins } from "../styles";
import Image from 'next/image';
import { IconBell } from "../assets/images";

const StyledNavBar = styled.div`
    ${mixins.flexCenter}
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    max-width: 100%;
    height: var(--nav-height);
    background-color: var(--default-bg);
    overflow: hidden;
    z-index: 2;

    .col1 {
        width: 60%;
        padding: 20px;
        margin-left: var(--sidebar-width);
    }

    input[type="text"] {
        height: 57px;
        ${mixins.searchIcon}
        background-position: 20px 50%;
        background-color: var(--secondary-bg);
        border-radius: var(--border-radius);
        border: 0;
        outline: none;
        width: 100%;
        max-width: 873px;
        color: var(--cf-label);
        padding: 0 60px;
        font-size: var(--f-sm);
        margin-right: 40px;
        margin-left: -20px;
        transition: var(--transition);
        letter-spacing: 0.3px;

        @media(max-width: 1080px) {
            margin-left: 40px;
        }

        &:hover {
            background-color: rgba(240, 240, 245, 0.5);
            transition: var(--quick-transition);
        }
        &:focus,
        select:focus,
        textarea:focus {
            outline: none;
            border: 0px solid rgba(20, 20, 43, 0.8);
            opacity: 1;
            box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
                background-color: var(--default-bg);
                transition: var(--transition);
        }
    }
    .col2 {
        ${mixins.flexCenter}
        width: 20%;
        margin-left: 20px;
    }
`;

const NavBar = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[]);

    return (
        <StyledNavBar>
            <div className="col1">
                <input type="text" placeholder="Search" />
            </div>
            <div className="col2">
                <IconBell />
            </div>
        </StyledNavBar>
    )
};

export default NavBar;