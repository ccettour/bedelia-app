import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../UserContext/UserContext';
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Form, InputGroup, Modal, Table } from "react-bootstrap";

import "./estudiante.css";

export function Estudiante() {
  const baseURL = "http://localhost:3005";
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  // objeto para almacenar la información del estudiante
  const [foto, setFoto] = useState(null);
  const [estudiante, setEstudiante] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    nacionalidad: "",
    correoElectronico: "",
    fechaNacimiento: "",
    celular: ""
  });

  // Datos de estudiantes buscados
  const [datos, setDatos] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const cerrarModal = () => setShowModal(false);
  const verModal = () => { setShowModal(true); };

  const cambiarFoto = (e) => {
    setFoto(e.target.files[0]);
  };

  useEffect(() => {
    buscarEstudiantes();
  }, []);

  const buscarEstudiantes = async () => {
    axios.get(baseURL + '/api/v1/estudiante/estudiantes', {
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

  const eliminarEstudiante = async (idEstudiante) => {
    Swal.fire({
      title: '¿Confirma que desea eliminar el estudiante?',
      showDenyButton: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(baseURL + '/api/v1/estudiante/estudiantes/' + idEstudiante, {
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
              buscarEstudiantes();
            }
          })
          .catch(error => {
            console.log(error);
          })
      }
    })
  }

  const enviarInformacion = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('dni', estudiante.dni);
    formData.append('nombre', estudiante.nombre);
    formData.append('apellido', estudiante.apellido);
    formData.append('fechaNacimiento', estudiante.fechaNacimiento);
    formData.append('nacionalidad', estudiante.nacionalidad);
    formData.append('correoElectronico', estudiante.correoElectronico);
    formData.append('celular', estudiante.celular);
    formData.append('foto', foto);

    try {
      const response = await axios.post(baseURL + '/api/v1/estudiante/estudiantes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userData.token}` //Para autenticar al usuario
        },
      });

      if (response.data.estado === 'OK') {
        const result = await Swal.fire({
          text: response.data.msj,
          icon: 'success'
        })

        if (result.isConfirmed) {
          cerrarModal();
          buscarEstudiantes();
          setEstudiante({
            dni: '',
            nombre: '',
            apellido: '',
            nacionalidad: '',
            correoElectronico: '',
            fechaNacimiento: '',
            celular: ''
          }
          );
        }
      }
    } catch (error) {
      console.error('Error al crear el estudiante: ', error);
    }
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
          <Button variant="light" onClick={verModal}>
            Crear estudiante
          </Button>
          <Button variant="light" onClick={dashboard}>
            Volver
          </Button>
        </div>
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
              <th className="tabla-thead">Foto</th>
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
              <td colSpan={8}>No hay estudiantes para mostrar</td>
            )}
          </tbody>
        </Table>
      </div>


      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => enviarInformacion(e)}>
            <div className='row'>
              <div className="col-md-4">
                <Form.Group className="mb-3" controlId="formBasicdni">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control type="text"
                    onChange={(e) => setEstudiante({ ...estudiante, dni: e.target.value })}
                    value={estudiante.dni} required />
                </Form.Group>
              </div>
            </div>
            <div className='row'>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formBasicNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text"
                    onChange={(e) => setEstudiante({ ...estudiante, nombre: e.target.value })}
                    value={estudiante.nombre} required />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formBasicApellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control type="text"
                    onChange={(e) => setEstudiante({ ...estudiante, apellido: e.target.value })}
                    value={estudiante.apellido} required />
                </Form.Group>
              </div>
            </div>
            <div className='row'>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formBasicNacionalidad">
                  <Form.Label>Nacionalidad</Form.Label>
                  <Form.Select onChange={(e) => setEstudiante({ ...estudiante, nacionalidad: e.target.value })}>
                    <option value="">Seleccionar</option>
                    <option value="0">Argentino</option>
                    <option value="1">Uruguayo</option>
                    <option value="2">Chileno</option>
                    <option value="3">Paraguayo</option>
                    <option value="4">Brasilero</option>
                    <option value="5">Boliviano</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formBasicFechaNacimiento">
                  <Form.Label>Fecha Nacimiento</Form.Label>
                  <Form.Control type="date"
                    onChange={(e) => setEstudiante({ ...estudiante, fechaNacimiento: e.target.value })}
                    value={estudiante.fechaNacimiento} required />
                </Form.Group>
              </div>
            </div>
            <div className='row'>
              <div className="col-md-8">
                <Form.Group className="mb-3" controlId="formBasicCorreoElectronico">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control type="text"
                    onChange={(e) => setEstudiante({ ...estudiante, correoElectronico: e.target.value })}
                    value={estudiante.correoElectronico} required />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3" controlId="formBasicCelular">
                  <Form.Label>Celular</Form.Label>
                  <Form.Control type="text"
                    onChange={(e) => setEstudiante({ ...estudiante, celular: e.target.value })}
                    value={estudiante.celular} required />
                </Form.Group>
              </div>
            </div>
            <div className='row'>
              <div className="col-md-12">
                <Form.Group className="mb-3" controlId="formBasicCelular">
                  <Form.Label>Elegir foto:</Form.Label>
                  <Form.Control type="file" size="sm"
                    accept=".jpg, .jpeg, .png" // Define los tipos de archivo permitidos                                        
                    onChange={cambiarFoto}
                  />
                </Form.Group>
              </div>
            </div>

            <Button variant="primary" type="submit">
              Crear
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
