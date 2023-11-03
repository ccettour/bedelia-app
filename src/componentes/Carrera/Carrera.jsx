import { useState, useEffect, useContext } from "react";
import { UserContext } from '../UserContext/UserContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Table, Form, Modal, Container } from "react-bootstrap";

import "./carrera.css";

export function Carrera() {
  const baseURL = "http://localhost:3005";
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const [inscriptos, setInscriptos] = useState(null);

   // objeto para almacenar la información de la carrera
   const [carrera, setCarrera] = useState({
     idCarrera: "",
     nombre: "",
     modalidad: ""
   });
 
   // Datos para buscar carreras 
   const [datos, setDatos] = useState(null);
 
   const [showModal, setShowModal] = useState(false);
   const cerrarModal = () => setShowModal(false);
   const verModal = () => { setShowModal(true); };
 
 //para editar carrera//
   const [editMode, setEditMode] = useState(false);
 
 
 
   useEffect(() => {
     buscarCarreras();
   }, []);

   const buscarCarreras = async () => {
    axios.get(baseURL + '/api/v1/carrera/carreras', {
      headers: {
        Authorization: `Bearer ${userData.token}`  //Para autenticar al usuario
      }
    })
      .then((res) => {
        console.log(res.data.dato);
        setDatos(res.data.dato);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const eliminarCarrera = async (idCarrera) => {
    Swal.fire({
      title: '¿Confirma que desea eliminar la carrera?',
      showDenyButton: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(baseURL + "/api/v1/carrera/carreras/" + idCarrera, {
          headers: {
            Authorization: `Bearer ${userData.token}`
          }
        })
          .then(async resp => {
            const result = await Swal.fire({
              text: resp.data.msj,
              icon: 'success'
            });

            if (result.isConfirmed) {
              buscarCarreras();
            }
          })
          .catch(error => {
            console.log(error);
          })
      }
    })
  };

  const crearCarrera = async (e) => {
    e.preventDefault();

    axios
      .post(baseURL + "/api/v1/carrera/carreras", carrera, { headers: { Authorization: `Bearer ${userData.token}` } })
      .then((res) => {
        if (res.data.estado === "OK") {
          Swal.fire({

            icon: "success",
            title: res.data.msj,
            showConfirmButton: false,
            timer: 1500,
          });

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
      .get(baseURL + "/api/v1/estudianteCarrera/estudianteCarrera/" + idCarrera, { headers: { Authorization: `Bearer ${userData.token}` } })
      .then((res) => {
        setInscriptos(res.data.dato);
        setModalShow(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const editarCarrera = (carrera) => {
    setEditMode(true);
    setCarrera(carrera);

  };

  const actualizarCarrera = async () => {
    try {
      const response = await axios.put(baseURL + "/api/v1/carrera/carreras", carrera, { headers: { Authorization: `Bearer ${userData.token}` } });
      if (response.data.estado === "OK") {
        Swal.fire({
          icon: "success",
          title: response.data.msj,
          showConfirmButton: false,
          timer: 1500,
        });
        editarCarrera();
        buscarCarreras();
        handleClose();
      }
    } catch (error) {
      console.error("Error al actualizar carrera:", error);
    }
  };

  const dashboard = () => {
    navigate("/privado/dashboard");
  };

  function VerAlumnosInscriptos(props) {
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


  ///Funcion de actualizar///
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setCarrera({ idCarrera: "", nombre: "", modalidad: "" });
    setEditMode(false);
    setShow(false);
  };
  const handleShow = (carrera) => {
    setCarrera(carrera)
    setShow(true);
  };



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

                      <Button variant="success" className="miBoton" onClick={() => handleShow(item)}>
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

        <VerAlumnosInscriptos show={modalShow} onHide={() => setModalShow(false)} />

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
                      <option value="0">presencial</option>
                      <option value="1">virtual</option>
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

        {/* Actualizacion */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Datos nuevo de la carrera</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">


                <Form.Label>Carrera</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  value={carrera.nombre}
                  onChange={(e) =>
                    setCarrera({ ...carrera, nombre: e.target.value })}
                />

              </Form.Group>


              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Modalidad de la carrera</Form.Label>
                <Form.Select
                  onChange={(e) =>
                    setCarrera({ ...carrera, modalidad: e.target.value })
                  }
                >
                  <option value="">Seleccionar...</option>
                  <option value="0">presencial</option>
                  <option value="1">virtual</option>
                </Form.Select>

              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={() => handleShow(actualizarCarrera)}>
              Actualizar
            </Button>
          </Modal.Footer>
        </Modal>



      </div>
    </>
  );
}
