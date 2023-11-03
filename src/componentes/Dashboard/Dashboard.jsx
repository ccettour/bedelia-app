import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext/UserContext';
import { ProtectedElement } from '../ProtectedElement/ProtectedElement';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import './dashboard.css';
/* 
import { estadistica } from './api/v1/estadistica'; */

const Dashboard = () => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);
    const [estadisticas, setEstadisticas] = useState({ alumnosActivos: 0, inscripciones: 0 });

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

   /*  useEffect(() => {
        // Llama a la función estadistica para obtener los datos estadísticos
        estadistica()
            .then((datos) => {
                setEstadisticas(datos);
            })
            .catch((error) => {
                console.error('Error al obtener estadísticas: ' + error);
            });
    }, []);
 */
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
                                                <Card.Title className='titleEstadistica'>Carreras</Card.Title>
                                                <Card.Subtitle className="mb-2 textEstadistica">cantidad</Card.Subtitle>
                                                <Card.Text className='textEstadistica'><h3>100</h3></Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={6} md={4} lg={3}>
                                        <Card className='cardEstadistica'>
                                            <Card.Body>
                                                <Card.Title className='titleEstadistica'>Estudiantes</Card.Title>
                                                <Card.Subtitle className="mb-2 textEstadistica">Inscriptos</Card.Subtitle>
                                                <Card.Text className='textEstadistica'><h3>{estadisticas.alumnosActivos}</h3></Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={6} md={4} lg={3}>
                                        <Card className='cardEstadistica'>
                                            <Card.Body>
                                                <Card.Title className='titleEstadistica'>Materias</Card.Title>
                                                <Card.Subtitle className="mb-2 textEstadistica">Cantidad de materias</Card.Subtitle>
                                                <Card.Text className='textEstadistica'><h3>{estadisticas.inscripciones}</h3></Card.Text>
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