import { Button, Form } from 'react-bootstrap';

function TaskForm({ isCompleted, handleCallBack, task = null }) {

    function handleSubmit(e) {
        e.preventDefault();
        handleCallBack(e);
    }

    return(
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-3">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control name='name' type="login" defaultValue={task?.name} 
                            placeholder="Enter Task Name"
                            required/>
                            <Form.Text className="text-muted">
                                We'll never share your username with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control 
                                name='dueDate' 
                                type="datetime-local" 
                                defaultValue= {(task?.dueDate || '').toString().substring(0, 16)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckBox">
                        <Form.Check 
                            name='completed'
                            type="switch"
                            id="custom-switch"
                            label="Is Completed?" 
                            disabled={!isCompleted}
                            defaultChecked={task?.completed || false}                                    
                        />
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            {isCompleted ? "Update" : "Create"}
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default TaskForm;