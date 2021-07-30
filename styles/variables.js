import { css } from "styled-components";

const variables = css`

    :root {

        /********** FONTS *********/
        
        --font-default: 'Poppins', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui, sans-serif;

        --f-xxs: 10px;
        --f-xs: 12px;
        --f-sm: 14px;
        --f-md: 16px;
        --f-lg: 20px;
        --f-xl: 24px;
        --f-xxl: 28px;
        --f-huge: 35px;
        --f-xtrahuge: 40px;
        --f-massive: 50px;

        /********** COLORS *********/

        --default-bg: #FCFCFC;
        --secondary-bg: #F7F7FC;
        
        --primary-accent: #610BEF;

        --select-icon: #610BEF;
        --deselect-icon: #6E7191;

        --primary-select-bg: #EBECFE;

        /* Font Colors (Lightest to Darkest) */
        --cf-white: #FCFCFC;
        --cf-meta: #A0A3BD;
        --cf-label: #6E7191;
        --cf-main: #4E4B66;

        --card-border: #F0EEEE;

        --off-black: #14142B;

        --form-input: #14142B;

        /********** PROPERTIES *********/

        --nav-height: 96px;
        --sidenav-width: 96px;

        /********** OTHER *********/

        --border-radius: 10px;
        --transition: all 0.6s cubic-bezier(0, 0.55, 0.45, 1);
        --quick-transition: all 0.3s cubic-bezier(0, 0.55, 0.45, 1);

    }

`;

export default variables;