import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext/UserContext';

import { ProtectedElement } from '../ProtectedElement/ProtectedElement';
import axios from 'axios';

import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';


import './dashboard.css';


const Dashboard = () => {
    const baseURL = 'http://localhost:3005';
    const navigate = useNavigate();
    const { userData} = useContext(UserContext);
    const [estadistica, setEstadistica] = useState({ materia: 0, carrera: 0, estudiante: 0 });


    useEffect(()=>{
        if(userData.user.tipoUsuario === 0){
            buscarEstadistica();
        }
    },[]); 

    const buscarEstadistica = async () =>{
        await axios.get(baseURL + '/api/v1/estadistica/estadistica',{
            headers:{
                Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            }
        })
        .then( resp => {
            setEstadistica(resp.data.dato);
        })
        .catch( error => {
            console.log(error);
        })
    }



    const irAEstudiantes = () => {
        navigate(`/privado/estudiante`);
    };

    const irACarreras = () => {
        navigate(`/privado/carreras`);
    };

    const irAMaterias = () => {
        navigate(`/privado/materias`);
    };

    const irAEstudianteCarrera = () => {
        navigate(`/privado/estudianteCarrera`);
    };

    const irAEstudianteMateria = () => {
        navigate(`/privado/estudianteMateria`);
    };

    return (userData.user ?
        <>
            <div className='container mt-3 mb-1 mb-5'>
                <h1>¡Bienvenide {userData.user.nombre}!</h1>

                {/* Para BEDEL */}
                <ProtectedElement mustBeBedel={true}>
                    <div className='row'>
                        <div className="col-md-10">
                            <h3>Estudiantes</h3>
                        </div>
                        <div className="col-md-2">
                            <Button variant="light" onClick={irAEstudiantes}>Ver</Button>
                        </div>
                    </div>
                </ProtectedElement>
                <ProtectedElement mustBeBedel={true}>
                    <div className='row'>
                        <div className="col-md-10">
                            <h3>Carreras</h3>
                        </div>
                        <div className="col-md-2">
                            <Button variant="light" onClick={irACarreras}>Ver</Button>
                        </div>
                    </div>
                </ProtectedElement>
                <ProtectedElement mustBeBedel={true}>
                    <div className='row'>
                        <div className="col-md-10">
                            <h3>Materias</h3>
                        </div>
                        <div className="col-md-2">
                            <Button variant="light" onClick={irAMaterias}>Ver</Button>
                        </div>
                    </div>
                </ProtectedElement>
                <ProtectedElement mustBeBedel={true}>
                    <div className='row'>
                        <div className="col-md-10">
                            <h3>Inscripción a carreras</h3>
                        </div>
                        <div className="col-md-2">
                            <Button variant="light" onClick={irAEstudianteCarrera}>Ver</Button>
                        </div>
                    </div>
                </ProtectedElement>
                <ProtectedElement mustBeBedel={true}>
                    <div className='row'>
                        <div className="col-md-10">
                            <h3>Inscripción a materias</h3>
                        </div>
                        <div className="col-md-2">
                            <Button variant="light" onClick={irAEstudianteMateria}>Ver</Button>
                        </div>
                    </div>
                </ProtectedElement>

                {/* Para DECANO */}
                <ProtectedElement mustBeDecano={true}>
                    <div className='row'>
                        <div className='container mt-3 mb-1 mb-5'>
                            <div className="col-md-12">
                                <div className='row'>
                                    <Col sm={6} md={4} lg={3}>
                                        <Card className='cardEstadistica'>
                                            <Card.Body>
                                                <Card.Title className='titleEstadistica'>Materia</Card.Title>
                                                <Card.Subtitle className="mb-2 textEstadistica">cantidad</Card.Subtitle>
                                                <Card.Text className='textEstadistica'><h3>{estadistica && estadistica[0] && estadistica[0].Materia}</h3></Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={6} md={4} lg={3}>
                                        <Card className='cardEstadistica'>
                                            <Card.Body>
                                                <Card.Title className='titleEstadistica'>Carrera</Card.Title>
                                                <Card.Subtitle className="mb-2 textEstadistica">Cantidad</Card.Subtitle>
                                                <Card.Text className='textEstadistica'><h3>{estadistica && estadistica[0] && estadistica[0].Carrera}</h3></Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={6} md={4} lg={3}>
                                        <Card className='cardEstadistica'>
                                            <Card.Body>
                                                <Card.Title className='titleEstadistica'>Estudiantes</Card.Title>
                                                <Card.Subtitle className="mb-2 textEstadistica">Cantidad de Estudiantes</Card.Subtitle>
                                                <Card.Text className='textEstadistica'><h3>{estadistica && estadistica[0] && estadistica[0].Estudiante}</h3></Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={6} md={4} lg={3}>
                                        <Card className='cardEstadistica'>
                                            <Card.Body>
                                                <Card.Title className='titleEstadistica'>Inscripciones</Card.Title>
                                                <Card.Subtitle className="mb-2 textEstadistica">Cantidad de Inscripciones en carreras</Card.Subtitle>
                                                <Card.Text className='textEstadistica'><h3>{estadistica && estadistica[0] && estadistica[0].cantidadInscriptos}</h3></Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </div>
                            </div>
                        </div>
                    </div>
                </ProtectedElement>
            </div>
        </> : <></>
    );
};

export { Dashboard };