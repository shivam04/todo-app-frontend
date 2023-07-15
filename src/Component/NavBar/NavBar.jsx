import { Navbar, Nav, Container } from 'react-bootstrap';
import { clearSession } from '../../Helper/Axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import { useContext } from 'react';

function NavBar() {
    const {isActive, setIsActive} = useContext(AuthContext);
    const nav = useNavigate();
    function logout(e) {
        e.preventDefault();
        clearSession(nav, setIsActive);
    }
    return (
        <> 
            <Navbar expand="lg" className='bg-body-tertiary'>
                <Container>
                    <Navbar.Brand href="/"> Home </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {isActive ? 
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/create">Create Task</Nav.Link>
                                <Nav.Link href="/tasks">List Tasks</Nav.Link>
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    : <></>}
                </Container>
            </Navbar>
        </>
    );
}


export default NavBar;