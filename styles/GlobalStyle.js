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

body {
    background-color: var(--secondary-bg);
}


/****
Transitions
****/

/* Fade */

.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    opacity: 1;
    transition: opacity 1500ms cubic-bezier(0, 0.55, 0.45, 1);
}
.fade-exit {
    opacity: 1;
}
.fade-exit-active {
    opacity: 0;
    transition: opacity 1500ms cubic-bezier(0, 0.55, 0.45, 1);
}

/* Fade Down */

.fadedown-enter {
    opacity: 0.01;
    transform: translateY(-20px);
    transition: opacity 1500ms cubic-bezier(0, 0.55, 0.45, 1), transform 1500ms cubic-bezier(0, 0.55, 0.45, 1);
}
.fadedown-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 1500ms cubic-bezier(0, 0.55, 0.45, 1), transform 1500ms cubic-bezier(0, 0.55, 0.45, 1);
}

/* Fade Up */

.fadeup-enter {
    opacity: 0.01;
    transform: translateY(20px);
    transition: opacity 1500ms cubic-bezier(0, 0.55, 0.45, 1), transform 1500ms cubic-bezier(0, 0.55, 0.45, 1);
}
.fadeup-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 1500ms cubic-bezier(0, 0.55, 0.45, 1), transform 1500ms cubic-bezier(0, 0.55, 0.45, 1);
}

/***
FAST TRANSITIONS
***/

.fastfade-enter {
    opacity: 0;
}
.fastfade-enter-active {
    opacity: 1;
    transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1);
}
.fastfade-exit {
    opacity: 1;
}
.fastfade-exit-active {
    opacity: 0;
    transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1);
}

/* Fade Down */

.fastfadedown-enter {
    opacity: 0.01;
    transform: translateY(-20px);
    transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1), transform 500ms cubic-bezier(0, 0.55, 0.45, 1);
}
.fastfadedown-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1), transform 500ms cubic-bezier(0, 0.55, 0.45, 1);
}

/* Fade Up */

.fastfadeup-enter {
    opacity: 0.01;
    transform: translateY(20px);
    transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1), transform 500ms cubic-bezier(0, 0.55, 0.45, 1);
}
.fastfadeup-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1), transform 500ms cubic-bezier(0, 0.55, 0.45, 1);
}

`;

export default GlobalStyle;