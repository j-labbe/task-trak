/**
 * Full Page Loader
 */
import { useState, useEffect } from "react";
import styled from "styled-components";
import { GlobalStyle, mixins } from 'styles';

interface LoaderProps {
    isMounted: boolean
}

const StyledLoader = styled.div<LoaderProps>`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: var(--secondary-bg);
    opacity: ${props => (props.isMounted ? `1` : `0`)};
    transition: var(--transition);

    
    .container {
        ${mixins.flexCenter}
        flex-direction: column;
        width: 100%;
        height: 100%;
        .loader {
            -webkit-animation: spin 1s linear infinite;
                    animation: spin 1s linear infinite;
            border: 3px solid #ddd;
            border-top: 3px solid #42a5f5;
            border-radius: 50%;
            height: 75px;
            width: 75px;
          }
          
          @-webkit-keyframes spin {
            to {
              border-top-color: #42a5f5;
              -webkit-transform: rotate(360deg);
                      transform: rotate(360deg);
            }
          }
          
          @keyframes spin {
            to {
              border-top-color: #42a5f5;
              -webkit-transform: rotate(360deg);
                      transform: rotate(360deg);
            }
          }
        h2 {
            font-family: var(--font-serif);
            font-size: 20px;
        }
        
    }
`;

const Loading = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    })

    return (
        <div>
            <GlobalStyle />
            <StyledLoader isMounted={isMounted}>
                <div className="container">
                    <div className="loader"></div>
                </div>
            </StyledLoader>
        </div>
    );
};

export default Loading;