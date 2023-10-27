import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

import { InformacionComponente } from '../Institucional/Institucional';
import { Contacto } from '../Contacto/Contacto';
import { Inicio } from '../Inicio/Inicio';
import { Crud } from '../Crud/crud';
import imgFCAD from './img/fcad.jpeg';

export function Header() {
  return (
    <BrowserRouter>
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
              <Nav.Link as={Link} to='/Crud'>Crud</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
    <Routes>
      <Route path='institucional' element={<InformacionComponente/>}></Route>
      <Route path='contacto' element={<Contacto/>}></Route>
      <Route path='Crud' element={<Crud/>}></Route>
      <Route path='/' element={<Inicio/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}