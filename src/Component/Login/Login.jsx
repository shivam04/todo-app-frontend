import { Button, Form } from 'react-bootstrap';
import { request, setAuthHeader } from '../../Helper/Axios';
import HttpMethod from '../../Constant/HttpMethod';

function Login({ setIsActive  }) {
    let loginState = {};

    function onChangeHandler(event) {
        let newLoginState = {...loginState};
        newLoginState[event.target.name] = event.target.value;
        loginState = {...newLoginState};
    }

    function onSubmitLogin(e) {
        e.currentTarget.disabled = true;
        request(
            HttpMethod.POST, 
            "/api/auth/authorize",
            {
                "userName": loginState.userName, 
                "password": loginState.password
            }
        ).then(res => {
            setIsActive(true);
            setAuthHeader(res)
        }).catch(err => {
            setIsActive(false);
            setAuthHeader(null);
        });
    }

    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-3">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control name='userName' type="login" placeholder="Enter userName" onChange={onChangeHandler} />
                            <Form.Text className="text-muted">
                                We'll never share your username with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name='password' type="password" placeholder="Password" onChange={onChangeHandler} />
                        </Form.Group>
                        <Button variant="primary" onClick={onSubmitLogin}>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;