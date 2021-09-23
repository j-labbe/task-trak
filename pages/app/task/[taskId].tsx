import Head from 'next/head';
import styled from 'styled-components';
import { GlobalStyle } from '../../../styles';
import NavBar from '../../../components/navbar';
import SideBar from '../../../components/sidebar';
import TaskView from '../../../components/interfaces/TaskView';
import { useRouter } from 'next/router';

const StyledHome = styled.div`
    overflow: hidden;
    width: 100% !important;
`;

const TaskPage = () => {

    const router = useRouter();
    const {taskId} = router.query;

    return (
        <StyledHome>
            <GlobalStyle />
            <Head>
                <title>Task {taskId}</title>
            </Head>
            <NavBar />
            <SideBar />
            <TaskView displayTask={Number(taskId)} />
        </StyledHome>
    )
}

export default TaskPage;