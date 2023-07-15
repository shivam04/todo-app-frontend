import TaskForm from '../TaskForm';
import NavBar from '../NavBar';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';
import HttpMethod from '../../Constant/HttpMethod';
import { request } from '../../Helper/Axios';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
    let [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    function handleSubmit(e) {
        const data = e.target.elements;
        const body = {
            "name": data.name.value,
            "dueDate": data.dueDate.value,
            "isCompleted": data.completed.checked
        }
        setIsLoading(true);
        request(
            HttpMethod.POST,
            '/task/create',
            body
        ).then(res => {
            navigate(`/task/${res.data.id}`);
        }).catch(err => {
            console.log(err);
        })
    }

    if (isLoading) {
        return (
            <>
                <Spinner animation="border" size="sm" />
                <Spinner animation="border" />
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" />
            </>
        );
    } else {
        return (
            <>
                <NavBar />
                <TaskForm 
                    isCompleted = {false}
                    handleCallBack = {handleSubmit}
                    task={null}
                />
            </>
        );
    }
}

export default CreateTask;