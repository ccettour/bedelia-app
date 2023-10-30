// propio de reactjs
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./Login.css";

export function Login() {
    const baseURL = "http://localhost:3005/api/v1/";
    const navigate = useNavigate();
    const [formulario, setFormulario] = useState({ correoElectronico: "", clave: "" });

    const { setUserData } = useContext(UserContext);


    const enviarInformacion = async (e) => {
        e.preventDefault();

        axios.post(baseURL + "auth/login", formulario)
            .then(res => {
                if (res.status === 200) {
                    console.log(formulario)
                    console.log(res.data);

                    // con los datos del usuario seteo el contexto del usuario, 
                    // también seteo el token para utilizarlo en las consultas al back
                    setUserData({ user: res.data.usuario, token: res.data.token });
                    navigate("/privado/dashboard");
                } else if (res.status === 400) {
                    //Ver por qué no funciona y agregar un aviso con el sweet que comenta Cristian en la clase del 10/10
                    alert("Usuario y/o contraseña incorrectos");
                }

            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <>
            <div className="titulo">
                <h2>INICIAR SESIÓN</h2>
            </div>
            <div className="login-container">
                <div className="login-form">
                    <Form onSubmit={e => enviarInformacion(e)}>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicUsuario">
                            <Form.Label column sm="2" className="etiqueta">Email:</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    name="email"
                                    onChange={(e) => setFormulario({ ...formulario, correoElectronico: e.target.value })}
                                    value={formulario.correoElectronico} required
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formBasicClave">
                            <Form.Label column sm="2" className="etiqueta">Clave:</Form.Label>
                            <Col sm="10">
                                <Form.Control type="password"
                                    name="clave"
                                    onChange={(e) => setFormulario({ ...formulario, clave: e.target.value })}
                                    value={formulario.clave} required />
                            </Col>
                        </Form.Group>

                        <div className="btnDiv">
                            <Button variant="light" type="submit" className="btn-light">
                                Iniciar sesión
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}