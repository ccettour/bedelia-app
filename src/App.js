import './App.css';


//mis compnentes
import { Header } from './componentes/Header/Header';
import { Footer } from './componentes/Footer/Footer';

import { Contacto } from './componentes/Contacto/Contacto';
import { Crud } from './componentes/Crud/Crud';
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
            <Route path='/login' element={<Login />} />

            <Route path='/privado/dashboard'
              element={
                // ruta protegida para usuarios logueados, presidente o entrendor
                <ProtectedRoute mustBeEntrenador={false}>
                  {<Dashboard />}
                </ProtectedRoute>
              } />

            <Route path='/privado/crud'
              element={
                // ruta protegida para usuarios logueados de tipo entrenador
                <ProtectedRoute mustBeEntrenador={false}>
                  {<Crud />}
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
