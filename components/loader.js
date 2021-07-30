import { useState, useEffect } from 'react';
import styled from "styled-components";

const StyledLoaderElem = styled.div`
    .loader,
    .loader:after {
        border-radius: 50%;
        width: 10em;
        height: 10em;
    }
    .loader {
        margin: 60px auto;
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        border-top: 1em solid var(--default-bg);
        border-right: 1em solid var(--default-bg);
        border-bottom: 1em solid var(--default-bg);
        border-left: 1em solid var(--primary-accent);
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation: load 1.3s infinite linear;
        animation: load 1.3s infinite linear;
    }
    @-webkit-keyframes load {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes load {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
`;

const Loader = () => (<StyledLoaderElem><div className="loader"></div></StyledLoaderElem>);

export default Loader;