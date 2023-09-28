import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "./contacto.css";

export function Contacto() {
    const baseURL = 'http://localhost:3005/contacto';

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const enviarMensaje = async (e) => {
        e.preventDefault();

        axios.post(baseURL/*, formData*/)
            .then(res => {
                console.log(res);
                //alert(res.data.respuesta)
                //setFormData({ nombre: '', email: '', mensaje: '' })
            })
            .catch(error => {
                console.log('error ', error);
            });
    }

    return (
        <>
            <div className="titulo">
                <h2>CONTACTO</h2>
            </div>

            <div className="body">

                <div className='contacto'>

                    <Form onSubmit={e => enviarMensaje(e)}>
                        <Form.Group as={Row} className="mb-3" controlId="formNombre">
                            <Form.Label column sm="2" className="etiqueta">Nombre:</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese su nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formEmail">
                            <Form.Label column sm="2" className="etiqueta">Email:</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="email"
                                    placeholder="Ingrese su email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formMensaje">
                            <Form.Label column sm="2" className="etiqueta">Mensaje:</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Ingrese su mensaje"
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <div className='btnDiv'>
                            <Button variant="light" type="submit" className="btn-light">
                                Enviar
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}