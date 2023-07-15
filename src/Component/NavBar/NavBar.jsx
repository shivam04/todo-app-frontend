import { Navbar, Nav, Container } from 'react-bootstrap';
import { isLoggedIn } from '../../Helper/Axios';
import { clearSession } from '../../Helper/Axios';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const nav = useNavigate();
    function logout(e) {
        e.preventDefault();
        console.log(e);
        clearSession(nav);
    }
    return (
        <> 
            <Navbar expand="lg" className='bg-body-tertiary'>
                <Container>
                    <Navbar.Brand href="/"> Home </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {isLoggedIn() ? 
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