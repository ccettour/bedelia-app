import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import imgFCAD from './fcad.jpeg';

export function Header() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home"><img src={imgFCAD} /></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">BEDELIA</Nav.Link>
                        <Nav.Link href="#features">Institucional</Nav.Link>
                        <Nav.Link href="#pricing">Contacto</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}