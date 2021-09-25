import { css } from "styled-components";

const mixins = {
    flexCenter: css`
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    flexBetween: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    searchIcon: css`
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyNCAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xMSAyMC41QzE1Ljk3MDYgMjAuNSAyMCAxNi40NzA2IDIwIDExLjVDMjAgNi41Mjk0NCAxNS45NzA2IDIuNSAxMSAyLjVDNi4wMjk0NCAyLjUgMiA2LjUyOTQ0IDIgMTEuNUMyIDE2LjQ3MDYgNi4wMjk0NCAyMC41IDExIDIwLjVaIiBzdHJva2U9IiM2RTcxOTEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPgogICAgPHBhdGggZD0iTTIyIDIyLjVMMTggMTguNSIgc3Ryb2tlPSIjNkU3MTkxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz4KPC9zdmc+CiAgICA=");
        background-repeat: no-repeat;
        `
};

export default mixins;