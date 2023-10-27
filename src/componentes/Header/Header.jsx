import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { ProtectedElement } from '../ProtectedElement/ProtectedElement';

import imgFCAD from './img/fcad.jpeg';



export function Header() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const toLogin = () => {
    navigate('/login');
  }

  return (
    <>
      <Navbar collapseOnSelect expand='md' bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/"><img src={imgFCAD} alt='logo' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='algo'/>
          <Navbar.Collapse id='algo'>
            <Nav className="me-auto">            
              <Nav.Link as={Link} to='/institucional'>Institucional</Nav.Link>
              <Nav.Link as={Link} to='/contacto'>Contacto</Nav.Link>
              <Nav.Link as={Link} to='/crud'>Crud</Nav.Link>
            </Nav>
            <Button className='btn btn-light end-button' onClick={toLogin}>Iniciar Sesión</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}