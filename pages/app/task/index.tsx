import Head from 'next/head';
import styled from 'styled-components';
import { GlobalStyle } from '../../../styles';
import NavBar from '../../../components/navbar';
import SideBar from '../../../components/sidebar';
import TaskView from '../../../components/taskview';
import { useRouter } from 'next/router';
import SelectATaskView from 'components/selectATaskView';

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
            <SelectATaskView />
        </StyledHome>
    )
}

export default TaskPage;