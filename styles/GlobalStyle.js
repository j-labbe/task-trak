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

/* Fade in & scale up */

.fadein-scale-enter {
    opacity: 0.01;
    transform: scale(0);
    transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1), transform 500ms cubic-bezier(0, 0.55, 0.45, 1);
}
.fadein-scale-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1), transform 500ms cubic-bezier(0, 0.55, 0.45, 1);
}

/**** nProgress ****/

#nprogress {
    position:absolute;
    z-index: 1031;
  pointer-events: none;
}

#nprogress .bar {
  background: #29d;

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 2px;
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #29d, 0 0 5px #29d;
  opacity: 1.0;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  bottom: 20px;
  left: 40px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: #29d;
  border-left-color: #29d;
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes nprogress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

`;

export default GlobalStyle;