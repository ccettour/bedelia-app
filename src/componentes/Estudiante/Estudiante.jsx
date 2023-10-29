import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Table, Form, Card, InputGroup } from "react-bootstrap";

import "./estudiante.css";

export function Estudiante() {
  const baseURL = "http://localhost:3005/api/v1/";
  const navigate = useNavigate();

  // objeto para almacenar la información del formulario
  const [formulario, setFormulario] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    nacionalidad: "",
    correoElectronico: "",
    fechaNacimiento: "",
  });

  // datos de estudiantes
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    buscarEstudiantes();
  }, []);

  const buscarEstudiantes = async () => {
    axios
      .get(baseURL + "estudiante/estudiantes")
      .then((res) => {
        console.log(res.data.dato);
        setDatos(res.data.dato);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const eliminarEstudiante = async (idEstudiante) => {
    axios
      .delete(baseURL + "estudiante/estudiantes/" + idEstudiante)
      .then((res) => {
        buscarEstudiantes();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const enviarInformacion = async (e) => {
    e.preventDefault();

    axios
      .post(baseURL + "estudiante/estudiantes", formulario)
      .then((res) => {
        console.log(res);
        if (res.data.estado === "OK") {
          alert(res.data.msj);
          buscarEstudiantes();
          setFormulario({
            dni: "",
            nombre: "",
            apellido: "",
            nacionalidad: "",
            correoElectronico: "",
            fechaNacimiento: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dashboard = () => {
    navigate("/privado/dashboard");
  };

  return (
    <>
      <div className="titulo">
        <h2>ESTUDIANTES</h2>
      </div>

      <div className="container mt-3 mb-2">
        <div className="btnDiv">
          <Button variant="light" onClick={dashboard}>
            Volver
          </Button>
        </div>


        <Card className="mt-3 mb-3">
          <Card.Body>
            <Form onSubmit={(e) => enviarInformacion(e)}>
              <div className="row">
                <div className="col-md-4">
                  <Form.Group className="mb-3" controlId="formBasicdni">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) =>
                        setFormulario({ ...formulario, dni: e.target.value })
                      }
                      value={formulario.dni}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group className="mb-3" controlId="formBasicNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) =>
                        setFormulario({ ...formulario, nombre: e.target.value })
                      }
                      value={formulario.nombre}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group className="mb-3" controlId="formBasicApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) =>
                        setFormulario({
                          ...formulario,
                          apellido: e.target.value,
                        })
                      }
                      value={formulario.apellido}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicNacionalidad"
                  >
                    <Form.Label>Nacionalidad</Form.Label>
                    <Form.Select
                      onChange={(e) =>
                        setFormulario({
                          ...formulario,
                          nacionalidad: e.target.value,
                        })
                      }
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="0">Argentino</option>
                      <option value="1">Uruguayo</option>
                      <option value="2">Chileno</option>
                      <option value="3">Paraguayo</option>
                      <option value="4">Brasilero</option>
                      <option value="5">Boliviano</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicCorreoElectronico"
                  >
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) =>
                        setFormulario({
                          ...formulario,
                          correoElectronico: e.target.value,
                        })
                      }
                      value={formulario.correoElectronico}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicFechaNacimiento"
                  >
                    <Form.Label>Fecha Nacimiento</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={(e) =>
                        setFormulario({
                          ...formulario,
                          fechaNacimiento: e.target.value,
                        })
                      }
                      value={formulario.fechaNacimiento}
                      required
                    />
                  </Form.Group>
                </div>
              </div>

              <Button variant="light" type="submit">
                Crear
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>

      <div className="container mt-4 mb-2">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Ingrese nombre, apellido o DNI"
            aria-label="buscar-estudiante"
            aria-describedby="campo-buscar-estudiante"
          />
          <Button variant="light" id="btn-buscar-estudiante">
            Buscar
          </Button>
        </InputGroup>
      </div>

      <div className="container mt-1 mb-5 miTabla">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="tabla-thead">Legajo</th>
              <th className="tabla-thead">DNI</th>
              <th className="tabla-thead">Apellido</th>
              <th className="tabla-thead">Nombre</th>
              <th className="tabla-thead">Nacionalidad</th>
              <th className="tabla-thead">Correo Electrónico</th>
              <th className="tabla-thead">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos ? (
              datos.map((item, index) => (
                <tr key={index}>
                  <td>{item.idEstudiante}</td>
                  <td>{item.dni}</td>
                  <td>{item.apellido}</td>
                  <td>{item.nombre}</td>
                  <td>{item.nacionalidad}</td>
                  <td>{item.correoElectronico}</td>
                  <td>
                    <Button variant="success" className="miBoton">
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => eliminarEstudiante(item.idEstudiante)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <td colSpan={7}>No hay estudiantes para mostrar</td>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}
