import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Table, Form, InputGroup } from "react-bootstrap";

import "./estudianteCarrera.css";

export function EstudianteCarrera() {
  const baseURL = "http://localhost:3005/api/v1/";
  const navigate = useNavigate();

  // objeto para almacenar la información del formulario
  const [formulario, setFormulario] = useState({
    estudiante: "",
    carrera: "",
    fechaAlta: "",
    fechaBaja: "",
  });

  // datos de inscripción a carrera
  const [datos, setDatos] = useState(null);

  const [carrerasInscripto, setCarrerasInscripto] = useState(null);
  const [carrerasNoInscripto, setCarrerasNoInscripto] = useState(null);

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

  const buscarCarrerasInscripto = async (idEstudiante) => {
    axios
      .get(baseURL + "estudianteCarrera/carrerasInscripto/" + idEstudiante)
      .then((res) => {
        console.log(res);
        setCarrerasInscripto(res.data.dato);

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
                      Inscribir
                    </Button>
                    <Button variant="danger" className="miBoton">
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

      
    </>
  );
}
