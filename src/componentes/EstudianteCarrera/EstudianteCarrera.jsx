import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Table, Form, InputGroup, Modal } from "react-bootstrap";

import "./estudianteCarrera.css";

export function EstudianteCarrera() {
  const baseURL = "http://localhost:3005";
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  // objeto para almacenar la información de la inscripcion
  const [inscripcion, setInscripcion] = useState({
    estudiante: "",
    carrera: "",
    fechaAlta: "",
    fechaBaja: "",
  });

  // Datos de estudiante, carreras inscripto y carreras no inscripto
  const [datosEstudiante, setDatosEstudiante] = useState(null);
  const [carrerasInscripto, setCarrerasInscripto] = useState(null);
  const [carrerasNoInscripto, setCarrerasNoInscripto] = useState(null);

  useEffect(() => {
    buscarEstudiantes();
  }, []);

  const buscarEstudiantes = async () => {
    axios
      .get(baseURL + "/api/v1/estudiante/estudiantes", { headers: { Authorization: `Bearer ${userData.token}` } })
      .then((res) => {
        console.log(res.data.dato);
        setDatosEstudiante(res.data.dato);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  /* Para inscribir */
  const [modalInscripcion, setModalInscripcion] = useState(false);
  const cerrarModalInscripcion = () => {
    setInscripcion({ ...inscripcion, carrera: "" });
    setModalInscripcion(false);
  };


  const buscarCarrerasNoInscripto = async (idEstudiante) => {
    axios
      .get(baseURL + "/api/v1/estudianteCarrera/carrerasNoInscripto/" + idEstudiante, { headers: { Authorization: `Bearer ${userData.token}` } })
      .then((res) => {
        setInscripcion({ ...inscripcion, estudiante: idEstudiante })
        setCarrerasNoInscripto(res.data.dato);
        setModalInscripcion(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const inscribir = async (e) => {
    e.preventDefault();

    axios
      .post(baseURL + "/api/v1/estudianteCarrera/inscripcionCarrera", inscripcion, { headers: { Authorization: `Bearer ${userData.token}` } })
      .then((res) => {
        console.log(res.data.estado);
        if (res.data.estado === "OK") {

          Swal.fire({
            icon: "success",
            title: res.data.msj,
            showConfirmButton: false,
            timer: 1500,
          });

          setInscripcion({
            estudiante: "",
            carrera: "",
            fechaAlta: "",
            fechaBaja: "",
          });

          setModalInscripcion(false);
        }
      })
      .catch((error) => {
        if (error.response.data.estado === "FALLO") {
          Swal.fire({
            icon: "error",
            title: "Seleccione una carrera",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log(error);
      });
  }


  /* Para desinscribir */
  const [modalDesinscripcion, setModalDesinscripcion] = useState(false);
  const cerrarModalDesinscripcion = () => setModalDesinscripcion(false);

  const buscarCarrerasInscripto = async (idEstudiante) => {
    axios
      .get(baseURL + "/api/v1/estudianteCarrera/carrerasInscripto/" + idEstudiante, { headers: { Authorization: `Bearer ${userData.token}` } })
      .then((res) => {
        setInscripcion({ ...inscripcion, estudiante: idEstudiante, carrera: "" })
        setCarrerasInscripto(res.data.dato);
        setModalDesinscripcion(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const desinscribir = async (e) => {
    e.preventDefault();
    
    axios
      .put(baseURL + "/api/v1/estudianteCarrera/inscripcionCarrera", inscripcion, { headers: { Authorization: `Bearer ${userData.token}` } })
      .then((res) => {
        if (res.data.estado === "OK") {

          Swal.fire({
            icon: "success",
            title: res.data.msj,
            showConfirmButton: false,
            timer: 1500,
          });

          setInscripcion({
            estudiante: "",
            carrera: "",
            fechaAlta: "",
            fechaBaja: "",
          });

          setModalDesinscripcion(false);
        }
      })
      .catch((error) => {
        console.log(error.response.data)
        if (error.response.data.estado === "FALLO") {
          Swal.fire({
            icon: "error",
            title: "Seleccione una carrera",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log(error);
      });
  }


  const dashboard = () => {
    navigate("/privado/dashboard");
  };

  //Buscar estudiante
  const [busqueda, setBusqueda] = useState("");

  const handleInputChange = (e) => { setBusqueda(e.target.value); };

  const buscarPorCriterio = async () => {

    if (busqueda.length > 0) {
      axios
        .get(baseURL + "/api/v1/estudiante/estudiante/" + busqueda, {
          headers: {
            Authorization: `Bearer ${userData.token}`, //Para autenticar al usuario
          },
        })
        .then((res) => {
          if (res.data.dato.length == 0) {
            Swal.fire({
              icon: "error",
              title: "No hay coincidencia",
              showConfirmButton: false,
              timer: 1500,
            });
            buscarEstudiantes();
          } else {
            setDatosEstudiante(res.data.dato);
            setBusqueda("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      buscarEstudiantes();
    }
  };


  return (
    <>
      <div className="titulo">
        <h2>INSCRIPCIÓN A CARRERA</h2>
      </div>

      <div className="container mt-3 mb-2">
        <div className="btnDiv">
          <Button variant="light" onClick={dashboard}>
            Volver
          </Button>
        </div>
      </div>

      <div className="container mt-4 mb-2">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Ingrese nombre, apellido o DNI"
            type="text"
            required
            value={busqueda}
            onChange={handleInputChange}
          />
          <Button variant="light" onClick={buscarPorCriterio}>
            Buscar
          </Button>
        </InputGroup>
      </div>

      <div className="container mt-1 mb-5 miTabla">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="tabla-thead">Foto</th>
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
            {datosEstudiante ? (
              datosEstudiante.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      className='foto'
                      src={`http://localhost:3005/archivos/${item.foto}`} alt={item.foto}
                    />
                  </td>
                  <td>{item.idEstudiante}</td>
                  <td>{item.dni}</td>
                  <td>{item.apellido}</td>
                  <td>{item.nombre}</td>
                  <td>{item.nacionalidad}</td>
                  <td>{item.correoElectronico}</td>
                  <td>
                    <Button
                      variant="success"
                      className="miBoton"
                      onClick={() => buscarCarrerasNoInscripto(item.idEstudiante)}>
                      Inscribir
                    </Button>
                    <Button
                      variant="danger"
                      className="miBoton"
                      onClick={() => buscarCarrerasInscripto(item.idEstudiante)}>
                      Desinscribir
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

      <Modal show={modalInscripcion} onHide={cerrarModalInscripcion}>
        <Modal.Header closeButton>
          <Modal.Title>Inscribir alumno:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => inscribir(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Select
                onChange={(e) =>
                  setInscripcion({ ...inscripcion, carrera: parseInt(e.target.value) })
                }
              >
                <option value="">Seleccionar...</option>
                {carrerasNoInscripto ? (carrerasNoInscripto.map((carrera) => (
                  <option key={carrera.idCarrera} value={carrera.idCarrera}>
                    {carrera.nombre}
                  </option>
                ))
                ) : (
                  <option value="">No hay carreras para inscribirse</option>
                )}
              </Form.Select>
            </Form.Group>

            <Button variant="secondary" onClick={cerrarModalInscripcion}>
              Cerrar
            </Button>
            <Button variant="light" type="submit">
              Inscribir
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* DESINSCRIBIR DE UNA CARRERA */}

      <Modal show={modalDesinscripcion} onHide={cerrarModalDesinscripcion}>
        <Modal.Header closeButton>
          <Modal.Title>Desinscribir alumno:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => desinscribir(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Select
                onChange={(e) =>
                  setInscripcion({ ...inscripcion, carrera: parseInt(e.target.value) })
                }
              >
                <option value="">Seleccionar...</option>
                {carrerasInscripto ? (carrerasInscripto.map((carrera) => (
                  <option key={carrera.idCarrera} value={carrera.idCarrera}>
                    {carrera.nombre}
                  </option>
                ))
                ) : (
                  <option value="">El estudiante no tiene ninguna carrera activa</option>
                )}
              </Form.Select>
            </Form.Group>

            <Button variant="secondary" onClick={cerrarModalDesinscripcion}>
              Cerrar
            </Button>
            <Button variant="light" type="submit">
              Desinscribir
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
