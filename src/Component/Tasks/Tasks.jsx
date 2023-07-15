import { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import { request } from '../../Helper/Axios';
import HttpMethod from '../../Constant/HttpMethod';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Tasks() {
    let [isLoading, setIsLoading] = useState(true);
    let [tasks, setTasks] = useState([]);

    function getVariant(task) {
        let currentDate = new Date();
        let dueDate = new Date(task.dueDate);
        let seconds = (dueDate.getTime() - currentDate.getTime())/1000;

        if (task.completed) {
            return "success";
        }

        if (seconds <= 86400) {
            return "danger";
        }
        else if (seconds <= 432000) {
            return "warning";
        }
        return "";
    }

    useEffect(() => {
        request(
            HttpMethod.GET,
            '/task'
        ).then(res => {
            setIsLoading(false);
            setTasks(res.data);
        }).catch(err => {
            setIsLoading(false);
            setTasks([]);
        })
    }, []);

    if (isLoading) {
        return (
            <img 
              alt="loading"
              src="https://miro.medium.com/v2/resize:fit:720/1*e_Loq49BI4WmN7o9ItTADg.gif"
            />);
    } else {
        return (
            <>
                <NavBar />
                <div className='container'>
                    <div className='row justify-content-center'>
                        <ListGroup className='col-4'>
                            <ListGroupItem variant='info'>Tasks</ListGroupItem>
                            {
                                tasks.map((task) => {
                                    return (
                                        <ListGroupItem 
                                            variant={getVariant(task)}
                                            key={task.id}
                                        >
                                            <Link to={`../task/${task.id}`}>
                                                {task.name}
                                            </Link>
                                        </ListGroupItem>
                                    );
                                })
                            } 
                        </ListGroup>
                    </div>
                </div>
            </>
        );
    }

}

export default Tasks;