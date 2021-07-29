import { createGlobalStyle } from "styled-components";
import Fonts from "./fonts";
import variables from "./variables";

const GlobalStyle = createGlobalStyle`

${Fonts}
${variables}

html {
    box-sizing: border-box;
    width: 100%;
    font-family: var(--font-default);
}

*,
*:before,
*:after {
    box-sizing: inherit;
}

`;

export default GlobalStyle;