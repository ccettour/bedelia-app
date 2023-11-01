import "./App.css";

//mis compnentes
import { Header } from "./componentes/Header/Header";
import { Footer } from "./componentes/Footer/Footer";

import { Contacto } from "./componentes/Contacto/Contacto";
import { Estudiante } from "./componentes/Estudiante/Estudiante";
import { Carrera } from "./componentes/Carrera/Carrera";
import { Materia } from "./componentes/Materia/Materia";
import { EstudianteCarrera } from "./componentes/EstudianteCarrera/EstudianteCarrera";
import { EstudianteMateria } from "./componentes/EstudianteMateria/EstudianteMateria";
import { Dashboard } from "./componentes/Dashboard/Dashboard";
import { Inicio } from "./componentes/Inicio/Inicio";
import { Institucional } from "./componentes/Institucional/Institucional";
import { Login } from "./componentes/Login/Login";

import { UserProvider } from "./componentes/UserContext/UserContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./componentes/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <div className="appStyle">
      <BrowserRouter>
        <Header />
        <UserProvider>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/institucional" element={<Institucional />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />

            {/* Ruta protegida para usuarios logueados como DECANO o BEDEL */}
            <Route
              path="/privado/dashboard"
              element={
                <ProtectedRoute mustBeBedel={false}>
                  {<Dashboard />}
                </ProtectedRoute>
              }
            />

            {/* Ruta protegida para usuarios logueados como BEDEL */}
            <Route
              path="/privado/estudiante"
              element={
                <ProtectedRoute mustBeBedel={true}>
                  {<Estudiante />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/privado/carreras"
              element={
                <ProtectedRoute mustBeBedel={true}>
                  {<Carrera />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/privado/materias"
              element={
                <ProtectedRoute mustBeBedel={true}>
                  {<Materia />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/privado/estudianteCarrera"
              element={
                <ProtectedRoute mustBeBedel={true}>
                  {<EstudianteCarrera />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/privado/estudianteMateria"
              element={
                <ProtectedRoute mustBeBedel={true}>
                  {<EstudianteMateria />}
                </ProtectedRoute>
              }
            />
          </Routes>
        </UserProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
