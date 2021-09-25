import { css } from "styled-components";

const variables = css`

    :root {

        /********** FONTS *********/
        
        --font-default: 'Poppins', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui, sans-serif;
        --font-serif: 'Source Serif Pro', Cambria, "Hoefler Text", Utopia, "Liberation Serif", "Nimbus Roman No9 L Regular", Times, "Times New Roman", serif;


        --f-xxxs: 8px;
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

/** #610BEF **/

        /********** COLORS *********/

        --default-bg: #FCFCFC;
        --secondary-bg: #F7F7FC;
        
        --primary-accent: #610BEF;
        --primary-accent-hover: #4700AB;

        --primary-green: #AFEB91;
        --another-green: #00e3aa;

        --select-icon: #610BEF;
        --deselect-icon: #6E7191;

        --primary-select-bg: #EBECFE;

        --red: #E61B00;

        /* Font Colors (Lightest to Darkest) */
        --cf-white: #FCFCFC;
        --cf-meta: #A0A3BD;
        --cf-label: #6E7191;
        --cf-main: #4E4B66;
        --cf-ash: #262338;

        --card-border: #F0EEEE;

        --off-black: #14142B;

        --form-input: #14142B;

        /********** PROPERTIES *********/

        --nav-height: 96px;
        --sidenav-width: 96px;

        /********** OTHER *********/

        --overlay: rgba(0,0,0,0.25);
        --border-radius: 10px;
        --transition: all 0.6s cubic-bezier(0, 0.55, 0.45, 1);
        --quick-transition: all 0.3s cubic-bezier(0, 0.55, 0.45, 1);

    }

`;

export default variables;