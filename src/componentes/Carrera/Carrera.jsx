import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  Table,
  Form,
  Modal,
  Container,
  Col,
  Row,
} from "react-bootstrap";

import "./carrera.css";

export function Carrera() {
  const baseURL = "http://localhost:3005/api/v1";
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  //Manejo del modal
  const verModal = () => setShowModal(true);
  const cerrarModal = () => setShowModal(false);

  // objeto para almacenar la información del formulario
  const [carrera, setCarrera] = useState({ nombre: "", modalidad: "" });

  // datos de carrera
  const [datos, setDatos] = useState(null);

  const [inscriptos, setInscriptos] = useState(null);

  useEffect(() => {
    buscarCarreras();
  }, []);

  const buscarCarreras = async () => {
    axios
      .get(baseURL + "/carrera/carreras")
      .then((res) => {
        console.log(res);
        setDatos(res.data.dato);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const eliminarCarrera = async (idCarrera) => {
    axios
      .delete(baseURL + "/carrera/carreras/" + idCarrera)
      .then((res) => {
        buscarCarreras();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const crearCarrera = async (e) => {
    e.preventDefault();

    axios
      .post(baseURL + "/carrera/carreras", carrera)
      .then((res) => {
        if (res.data.estado === "OK") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.data.msj,
            showConfirmButton: false,
            timer: 1500,
          });
          //alert(res.data.msj);

          cerrarModal();
          buscarCarreras();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const mostrarInscriptos = async (idCarrera) => {
    axios
      .get(baseURL + "/carrera/inscriptos/" + idCarrera)
      .then((res) => {
        setInscriptos(res.data.dato);
        setModalShow(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dashboard = () => {
    navigate("/privado/dashboard");
  };

  function MydModalWithGrid(props) {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size="lg">
        
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Alumnos inscriptos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="tabla-thead">Legajo</th>
                  <th className="tabla-thead">DNI</th>
                  <th className="tabla-thead">Nombre</th>
                  <th className="tabla-thead">Apellido</th>
                  <th className="tabla-thead">Correo Electrónico</th>
                </tr>
              </thead>
              <tbody>
                {inscriptos ? (
                  inscriptos.map((item, index) => (
                    <tr key={index}>
                      <td>{item.idEstudiante}</td>
                      <td>{item.dni}</td>
                      <td>{item.nombre}</td>
                      <td>{item.apellido}</td>
                      <td>{item.correoElectronico}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No hay estudiantes inscriptos</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="titulo">
        <h2>CARRERAS</h2>
      </div>

      <div className="container mt-3">
        <div className="btnDiv">
          <Button variant="light" onClick={verModal}>
            Crear carrera
          </Button>
          <Button variant="light" onClick={dashboard}>
            Volver
          </Button>
        </div>

        <div className="item">
          <h2>Lista de Carreras</h2>
        </div>

        <div className="container mt-3 mb-5 miTabla">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="tabla-thead">Nro. Carrera</th>
                <th className="tabla-thead">Nombre</th>
                <th className="tabla-thead">Modalidad</th>
                <th className="tabla-thead">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datos ? (
                datos.map((item, index) => (
                  <tr key={index}>
                    <td>{item.idCarrera}</td>
                    <td>{item.nombre}</td>
                    <td>{item.modalidad}</td>
                    <td>
                      <Button
                        variant="primary"
                        className="miBoton"
                        onClick={() => mostrarInscriptos(item.idCarrera)}
                      >
                        Ver inscriptos
                      </Button>
                      <Button variant="success" className="miBoton">
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => eliminarCarrera(item.idCarrera)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No hay carreras para mostrar</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />

        <Modal show={showModal} onHide={cerrarModal}>
          <Modal.Header closeButton>
            <Modal.Title>Crear carrera</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => crearCarrera(e)}>
              <div className="row">
                <div className="col-md-4">
                  <Form.Group className="mb-3" controlId="formBasicNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) =>
                        setCarrera({ ...carrera, nombre: e.target.value })
                      }
                      value={carrera.nombre}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3" controlId="formBasicModalidad">
                    <Form.Label>Modalidad</Form.Label>
                    <Form.Select
                      onChange={(e) =>
                        setCarrera({ ...carrera, modalidad: e.target.value })
                      }
                    >
                      <option value="">Seleccionar...</option>
                      <option value="0">Presencial</option>
                      <option value="1">Virtual</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
              <Button variant="light" type="submit">
                Crear carrera
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
