import Image from 'next/image';
import * as Logo from './tasktrak.png';

const TaskTrakLogo = () => (
    <Image src={Logo} alt="TT" />
);

export default TaskTrakLogo;