import { useContext, useEffect } from 'react';
import TaskForm from '../TaskForm';
import NavBar from '../NavBar';
import { Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loadTask, updateTask } from '../../Store/TaskStore/TaskStore';
import { useNavigate } from 'react-router-dom';
import { request } from '../../Helper/Axios';

function Task({id}) {
    const task = useSelector((state) => state.task);
    const dispatch = useDispatch();
    const nav = useNavigate();

    function onSubmit(e) {
        const data = e.target.elements;
        console.log("Update", data);
        const body = {
            "id": id,
            "name": data.name.value,
            "dueDate": data.dueDate.value,
            "completed": data.completed.checked
        }
        dispatch(updateTask(body));
    }

    function deleteHandler(e) {
        e.preventDefault();
        const body = {
            "id": id,
        }

        e.currentTarget.disabled = true;
        
        request(
            'DELETE',
            'task/delete',
            body
        ).then(res => {
            nav("/tasks");
        }).catch(err => {
            e.currentTarget.disabled = false;
            console.log(err);
        });
    }

    useEffect(() => {
        dispatch(loadTask(id));
    }, [id, dispatch]);

    if (task.isLoading) {
        return (
            <>
                <NavBar />
                <Spinner animation="border" size="sm" />
                <Spinner animation="border" />
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" />
            </>
        );
    } else {
        return (<>
                <NavBar />
                <TaskForm 
                    isCompleted={true}
                    handleCallBack={onSubmit}
                    task={task.task}
                />
                <Button variant="danger" className='mt-1' onClick={deleteHandler}>Delete</Button>
            </>);
    }
}

export default Task;