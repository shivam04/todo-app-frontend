import Task from '../../Component/Task';
import { useParams } from 'react-router-dom';

function TaskPage() {
    const { id } = useParams();
    return <Task id={id}/>
}

export default TaskPage;