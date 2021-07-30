import Head from 'next/head';
import styled from 'styled-components';
import { GlobalStyle } from '../../styles';
import NavBar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import MyTasks from '../../components/myTasks';

const StyledHome = styled.div`
    overflow: hidden;
    width: 100% !important;
`;

const Home = () => {
    return (
        <StyledHome>
            <GlobalStyle />
            <Head>
                <title>Home</title>
            </Head>
            <NavBar />
            <SideBar />
            <MyTasks />
        </StyledHome>
    )
}

export default Home;