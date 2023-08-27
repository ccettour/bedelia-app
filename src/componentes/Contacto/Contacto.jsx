import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Contacto() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su nombre" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMensaje">
                <Form.Label>Mensaje:</Form.Label>
                <Form.Control as="textarea" aria-label="Ingrese su mensaje" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Enviar
            </Button>
        </Form>
    );
}

export default Contacto;