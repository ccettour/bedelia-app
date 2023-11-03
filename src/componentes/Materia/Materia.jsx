import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Table, Modal, Form, InputGroup } from "react-bootstrap";

import "./materia.css";

export function Materia() {
  const baseURL = "http://localhost:3005";
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  // objeto para almacenar la información de la materia
  const [materia, setMateria] = useState({
    idMateria: "",
    horasSemanales: "",
    nombre: "",
    tipoMateria: "",
    idCarrera: ""
  });

  const [carreras, setCarreras] = useState(null);

  // Datos de materias buscadas
  const [datos, setDatos] = useState(null);

  //Modal de creación
  const [showModal, setShowModal] = useState(false);
  const cerrarModal = () => setShowModal(false);
  const verModal = () => {
    buscarCarreras();
    setShowModal(true);
  }

  //-----------------------------

  useEffect(() => {
    buscarMaterias();
  }, []);

  const buscarMaterias = async () => {
    axios
      .get(baseURL + "/api/v1/materia/materias", {
        headers: {
          Authorization: `Bearer ${userData.token}`, //Para autenticar al usuario
        },
      })
      .then((res) => {
        setDatos(res.data.dato);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buscarCarreras = async () => {
    axios
      .get(baseURL + "/api/v1/carrera/carreras", { headers: { Authorization: `Bearer ${userData.token}` } })
      .then((res) => {
        console.log(res);
        setCarreras(res.data.dato);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buscarPorNombre = async (nombre) => {
    console.log(baseURL + "/api/v1/materia/materias/" + nombre);
    axios
      .get(baseURL + "/api/v1/materia/materias/" + nombre, {
        headers: {
          Authorization: `Bearer ${userData.token}`, //Para autenticar al usuario
        },
      })
      .then((res) => {
        console.log(res.data.dato);
        setDatos(res.data.dato);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const eliminarMateria = async (idMateria) => {
    Swal.fire({
      title: "¿Confirma que desea eliminar la materia?",
      showDenyButton: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(baseURL + "/api/v1/materia/materias/" + idMateria, {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          })
          .then(async (resp) => {
            const result = await Swal.fire({
              text: resp.data.msj,
              icon: "success",
            });

            if (result.isConfirmed) {
              buscarMaterias();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const enviarInformacion = async (e) => {
    e.preventDefault();

    console.log(materia);

    try {
      const response = await axios.post(
        baseURL + "/api/v1/materia/materias",
        materia,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`, //Para autenticar al usuario
          },
        }
      );

      if (response.data.estado === "OK") {
        const result = await Swal.fire({
          text: response.data.msj,
          icon: "success",
        });

        if (result.isConfirmed) {
          cerrarModal();
          buscarMaterias();
          setMateria({
            idMateria: "",
            horasSemanales: "",
            nombre: "",
            tipoMateria: "",
          });
        }
      }
    } catch (error) {
      console.error("Error al crear la materia: ", error);
    }
  };

  const dashboard = () => {
    navigate("/privado/dashboard");
  };

  ///Funcion de actualizar///
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setMateria({
      idMateria: "",
      horasSemanales: "",
      nombre: "",
      tipoMateria: "",
      idCarrera: ""
    });
    // setEditMode(false);
    setShow(false);
  };

  const handleShow = (materia) => {
    setMateria(materia);
    buscarCarreras();
    console.log(materia)
    setShow(true);
  };

  const editarMateria = (materia) => {
    //setEditMode(true);
    setMateria(materia);
  };

  //const [editMode, setEditMode] = useState(false);

  const actualizarMateria = async () => {
    try {
      const response = await axios.put(baseURL + "/api/v1/materia/materias", materia, { headers: { Authorization: `Bearer ${userData.token}` } });
      if (response.data.estado === "OK") {
        Swal.fire({
          icon: "success",
          title: response.data.msj,
          showConfirmButton: false,
          timer: 1500,
        });
        editarMateria();
        buscarMaterias();
        handleClose();
      }
    } catch (error) {
      console.error("Error al actualizar materia:", error);
    }
  };

  return (
    <>
      <div className="titulo">
        <h2>MATERIAS</h2>
      </div>

      <div className="container mt-3 mb-2">
        <div className="btnDiv">
          <Button variant="light" onClick={verModal}>
            Crear Materia
          </Button>
          <Button variant="light" onClick={dashboard}>
            Volver
          </Button>
        </div>
      </div>

      <div className="container mt-4 mb-2">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Ingrese nombre de la materia"
            type="text"
            onChange={(e) => setMateria({ ...materia, nombre: e.target.value })}
            value={materia.nombre}
            required
          />
          <Button
            variant="light"
            id="btn-buscar-materia"
            onClick={() => buscarPorNombre(materia.nombre)}
          >
            Buscar
          </Button>
        </InputGroup>
      </div>

      <div className="container mt-1 mb-5 miTabla">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="tabla-thead">Nro. materia</th>
              <th className="tabla-thead">Hs. semanales</th>
              <th className="tabla-thead">Nombre</th>
              <th className="tabla-thead">Tipo</th>
              <th className="tabla-thead">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos ? (
              datos.map((item, index) => (
                <tr key={index}>
                  <td>{item.idMateria}</td>
                  <td>{item.horasSemanales}</td>
                  <td>{item.nombre}</td>
                  <td>{item.tipoMateria}</td>
                  <td>
                    <Button variant="success" className="miBoton" onClick={() => handleShow(item)}>
                      Editar
                    </Button>
                    <Button variant="danger" className="miBoton" onClick={() => eliminarMateria(item.idMateria)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <td colSpan={5}>No hay materias para mostrar</td>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear materia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => enviarInformacion(e)}>
            <div className="row">
              <div className="col-md-4">
                <Form.Group className="mb-3" controlId="formBasicdni">
                  <Form.Label>Hs. semanales</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) =>
                      setMateria({ ...materia, horasSemanales: e.target.value })
                    }
                    value={materia.horasSemanales}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-8">
                <Form.Group className="mb-3" controlId="formBasicNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) =>
                      setMateria({ ...materia, nombre: e.target.value })
                    }
                    value={materia.nombre}
                    required
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <Form.Group className="mb-3" controlId="formBasicNacionalidad">
                  <Form.Label>Tipo</Form.Label>
                  <Form.Select
                    onChange={(e) =>
                      setMateria({
                        ...materia,
                        tipoMateria: e.target.value,
                      })
                    }
                  >
                    <option value="">Seleccionar</option>
                    <option value="0">ANUAL</option>
                    <option value="1">CUATRIMESTRAL</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-5">
                <Form.Group className="mb-3" controlId="formBasicNacionalidad">
                  <Form.Label>Carrera</Form.Label>
                  <Form.Select
                    onChange={(e) =>
                      setMateria({
                        ...materia,
                        idCarrera: e.target.value,
                      })
                    }
                  >
                    <option value="">Seleccionar...</option>
                    <option value="0">NINGUNA</option>
                    {carreras ? (carreras.map((carrera) => (
                      <option key={carrera.idCarrera} value={carrera.idCarrera}>
                        {carrera.nombre}
                      </option>
                    ))
                    ) : (
                      <option value="">No hay carreras disponibles</option>
                    )}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <Button variant="light" type="submit">
              Crear
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Actualizacion */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar datos de la materia:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-4">
                <Form.Group className="mb-3" controlId="formBasicdni">
                  <Form.Label>Hs. semanales</Form.Label>
                  <Form.Control
                    type="number"
                    value={materia.horasSemanales}
                    onChange={(e) =>
                      setMateria({ ...materia, horasSemanales: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-8">
                <Form.Group className="mb-3" controlId="formBasicNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={materia.nombre}
                    onChange={(e) =>
                      setMateria({ ...materia, nombre: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <Form.Group className="mb-3" controlId="formBasicNacionalidad">
                  <Form.Label>Tipo</Form.Label>
                  <Form.Select
                    value={materia.tipoMateria}
                    onChange={(e) =>
                      setMateria({ ...materia, tipoMateria: e.target.value })}>
                    <option value="">Seleccionar</option>
                    <option value="0">ANUAL</option>
                    <option value="1">CUATRIMESTRAL</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-5">
                <Form.Group className="mb-3" controlId="formBasicNacionalidad">
                  <Form.Label>Carrera</Form.Label>
                  <Form.Select
                    value={materia.idCarrera}
                    onChange={(e) =>
                      setMateria({ ...materia, idCarrera: e.target.value })}>
                    <option value="">Seleccionar...</option>
                    <option value="0">NINGUNA</option>
                    {carreras ? (carreras.map((carrera) => (
                      <option key={carrera.idCarrera} value={carrera.idCarrera}>
                        {carrera.nombre}
                      </option>
                    ))
                    ) : (
                      <option value="">No hay carreras disponibles</option>
                    )}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => handleShow(actualizarMateria)}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
