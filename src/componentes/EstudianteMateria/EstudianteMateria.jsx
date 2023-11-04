import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Table, Form, InputGroup, Modal } from "react-bootstrap";

import "./estudianteMateria.css";

export function EstudianteMateria() {
  const baseURL = "http://localhost:3005";
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  // objeto para almacenar la información de la inscripcion
  const [inscripcion, setInscripcion] = useState({
    fecha: "",
    estudiante: "",
    materia: ""
  });

  // Datos de estudiante, materias inscripto y materias no inscripto
  const [datosEstudiante, setDatosEstudiante] = useState(null);
  const [materiasInscripto, setMateriasInscripto] = useState(null);
  const [materiasNoInscripto, setMateriasNoInscripto] = useState(null);

  useEffect(() => {
    buscarEstudiantes();
  }, []);

  const buscarEstudiantes = async () => {
    axios.get(baseURL + '/api/v1/estudiante/estudiantes', {
      headers: {
        Authorization: `Bearer ${userData.token}` //Para autenticar al usuario
      }
    })
      .then(resp => {
        setDatosEstudiante(resp.data.dato);
      })
      .catch(error => {
        console.error(error);
      })
  }


  /* Para inscribir en Materia*/
  const [modalInscripcion, setModalInscripcion] = useState(false);
  const cerrarModalInscripcion = () => {
    setInscripcion({ ...inscripcion, materia: "" });
    setModalInscripcion(false);
  };

  const buscarMateriasNoInscripto = async (idEstudiante) => {
    axios
      .get(baseURL + "/api/v1/estudianteMateria/materiasNoInscripto/" + idEstudiante, { headers: { Authorization: `Bearer ${userData.token}` } })
      .then((res) => {
        setInscripcion({ ...inscripcion, estudiante: idEstudiante })
        setMateriasNoInscripto(res.data.dato);
        setModalInscripcion(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const inscribir = async (e) => {
    e.preventDefault();

    axios
      .post(baseURL + "/api/v1/estudianteMateria/inscripcionMateria", inscripcion, { headers: { Authorization: `Bearer ${userData.token}` } })
      .then((res) => {
        if (res.data.estado === "OK") {

          Swal.fire({
            icon: "success",
            title: res.data.msj,
            showConfirmButton: false,
            timer: 1500,
          });

          setInscripcion({
            fecha: "",
            estudiante: "",
            materia: ""
          });

          setModalInscripcion(false);
        }
      })
      .catch((error) => {
        if (error.response.data.estado === "FALLO") {
          Swal.fire({
            icon: "error",
            title: "Seleccione una materia",
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

  const buscarMateriasInscripto = async (idEstudiante) => {
    axios
      .get(baseURL + "/api/v1/estudianteMateria/materiasInscripto/" + idEstudiante, { headers: { Authorization: `Bearer ${userData.token}` } })
      .then((res) => {
        setInscripcion({ ...inscripcion, estudiante: idEstudiante, materia: "" })
        setMateriasInscripto(res.data.dato);
        setModalDesinscripcion(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const desinscribir = async (e) => {
    e.preventDefault();

    axios
      .put(baseURL + "/api/v1/estudianteMateria/inscripcionMateria", inscripcion, { headers: { Authorization: `Bearer ${userData.token}` } })
      .then((res) => {
        if (res.data.estado === "OK") {

          Swal.fire({
            icon: "success",
            title: res.data.msj,
            showConfirmButton: false,
            timer: 1500,
          });

          setInscripcion({
            fecha: "",
            estudiante: "",
            materia: ""
          });

          setModalDesinscripcion(false);
        }
      })
      .catch((error) => {
        if (error.response.data.estado === "FALLO") {
          Swal.fire({
            icon: "error",
            title: "Seleccione una materia",
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
          }
          setBusqueda("");
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
        <h2>INSCRIPCIÓN A MATERIA</h2>
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
          <Button variant="light" onClick={buscarPorCriterio}
          >
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
                      onClick={() => buscarMateriasNoInscripto(item.idEstudiante)}>
                      Inscribir
                    </Button>
                    <Button
                      variant="danger"
                      className="miBoton"
                      onClick={() => buscarMateriasInscripto(item.idEstudiante)}>
                      Desinscribir
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <td colSpan={8}>No hay estudiantes para mostrar</td>
            )}
          </tbody>
        </Table>
      </div>

      {/* INSCRIBIR A MATERIA */}

      <Modal show={modalInscripcion} onHide={cerrarModalInscripcion}>
        <Modal.Header closeButton>
          <Modal.Title>Inscribir alumno:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => inscribir(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Select
                onChange={(e) =>
                  setInscripcion({ ...inscripcion, materia: parseInt(e.target.value) })
                }
              >
                <option value="">Seleccionar...</option>
                {materiasNoInscripto ? (materiasNoInscripto.map((materia) => (
                  <option key={materia.idMateria} value={materia.idMateria}>
                    {materia.nombre}
                  </option>
                ))
                ) : (
                  <option value="">No hay materias para inscribirse</option>
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

      {/* DESINSCRIBIR DE UNA MATERIA */}

      <Modal show={modalDesinscripcion} onHide={cerrarModalDesinscripcion}>
        <Modal.Header closeButton>
          <Modal.Title>Desinscribir alumno:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => desinscribir(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Select
                onChange={(e) =>
                  setInscripcion({ ...inscripcion, materia: parseInt(e.target.value) })
                }
              >
                <option value="">Seleccionar...</option>
                {materiasInscripto ? (materiasInscripto.map((materia) => (
                  <option key={materia.idMateria} value={materia.idMateria}>
                    {materia.nombre}
                  </option>
                ))
                ) : (
                  <option value="">No hay materias para desinscribir</option>
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
