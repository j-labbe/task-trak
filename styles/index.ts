import { createGlobalStyle } from "styled-components";
import Fonts from "./fonts";

const GlobalStyle = createGlobalStyle`
    ${Fonts}
    html {
        box-sizing: border-box;
        width: 100%;
        font-family: 'Poppins', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui, sans-serif;
        background-color: #FCFCFC;
        color: #262338;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    body {
        height: 100%;
        width: 100%;
    }
`;

export default GlobalStyle;