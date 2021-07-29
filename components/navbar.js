import { useState, useEffect } from "react";
import styled from "styled-components";
import { mixins } from "../styles";

const StyledNavBar = styled.div`
    ${mixins.flexCenter}
    position: absolute;
    top: 0;
    width: 100%;
    height: var(--nav-height);
    background-color: var(--default-bg);

    .searchField {
        height: 57px;
        background-color: var(--secondary-bg);
        border-radius: var(--border-radius);
        border: 0;
        outline: none;
        width: 100%;
        color: var(--cf-label);
        padding: 0 20px 0 20px;
        font-size: var(--f-sm);
        margin-left: 20px;
        margin-right: 20px;
    }
`;

const NavBar = () => {
    return (
        <StyledNavBar>
            <h3>AppName</h3>
            <input className="searchField" placeholder="Search"></input>
        </StyledNavBar>
    )
};

export default NavBar;