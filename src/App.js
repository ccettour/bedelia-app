import './App.css';


//mis compnentes
import { Header } from './componentes/Header/Header';
import { Footer } from './componentes/Footer/Footer';

import { Contacto } from './componentes/Contacto/Contacto';
import { Crud } from './componentes/Crud/Crud';
import { Carrera } from './componentes/Carrera/Carrera';
import { Dashboard } from './componentes/Dashboard/Dashboard';
import { Inicio } from './componentes/Inicio/Inicio';
import { Institucional } from './componentes/Institucional/Institucional';
import { Login } from './componentes/Login/Login';

import { UserProvider } from './componentes/UserContext/UserContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './componentes/ProtectedRoute/ProtectedRoute';


function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/institucional' element={<Institucional />} />
            <Route path='/contacto' element={<Contacto />} />
            <Route path='/crud' element={<Crud />} />
            <Route path='/carreras' element={<Carrera />} />
            <Route path='/login' element={<Login />} />

            {/* Ruta protegida para usuarios logueados como DECANO o BEDEL */}
            <Route path='/privado/dashboard'
              element={
                <ProtectedRoute mustBeBedel={false}>
                  {<Dashboard />}
                </ProtectedRoute>
              } />

            {/* Ruta protegida para usuarios logueados como BEDEL */}
            <Route path='/privado/crud'
              element={
                <ProtectedRoute mustBeBedel={true}>
                  {<Crud />}
                </ProtectedRoute>
              } />
            <Route path='/privado/carreras'
              element={
                <ProtectedRoute mustBeBedel={true}>
                  {<Carrera />}
                </ProtectedRoute>
              } />
          </Routes>
        </UserProvider>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
