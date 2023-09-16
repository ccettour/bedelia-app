import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

import { Institucional } from '../Institucional/Institucional';
import { Contacto } from '../Contacto/Contacto';
import { Inicio } from '../Inicio/Inicio';
import imgFCAD from './img/fcad.jpeg';

export function Header() {
  return (
    <BrowserRouter>
    <>
      <Navbar collapseOnSelect expand='lg' bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/"><img src={imgFCAD} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='algo'/>
          <Navbar.Collapse id='algo'>
            <Nav className="me-auto">            
              <Nav.Link as={Link} to='/institucional'>Institucional</Nav.Link>
              <Nav.Link as={Link} to='/contacto'>Contacto</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
    <Routes>
      <Route path='institucional' element={<Institucional/>}></Route>
      <Route path='contacto' element={<Contacto/>}></Route>
      <Route path='/' element={<Inicio/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}