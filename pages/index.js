import Head from 'next/head';
import styled from 'styled-components';
import GlobalStyle from '../styles';

const StyledHome = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-direction: column;
        height: 100%;
        width: 100%;

    .main {
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-direction: column;
        padding: 40px;
    }

    h1 {
        font-size: 80px;
        text-align: center;
    }
    h3 {
        font-size: 30px;
        font-weight: 300;
        color: #6E7191;
        text-align: center;
        strong {
            font-weight: 700;
            color: #4E4B66;
        }
    }
    .line {
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        width: 50%;
        border-bottom: 2px solid black;
    }
`;

const Home = () => {
    return (
        <StyledHome>
            <Head>
                <title>Coming Soon - Task Trak</title>
            </Head>
            <GlobalStyle />
            <div className="main">
                <h1>Coming Soon</h1>
                <div className="line"></div>
                <h3>Check back soon to try out <strong>Task Trak</strong> when its live!</h3>
            </div>
        </StyledHome>
    )
}

export default Home;
