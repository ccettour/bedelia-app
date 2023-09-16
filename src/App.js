import './App.css';


//mis compnentes
import { Header } from './componentes/Header/Header';
import {InformacionComponente} from './componentes/Institucional/Institucional';
import { Footer } from './componentes/Footer/Footer';
import { Inicio } from './componentes/Inicio/Inicio';

function App() {
  return (
    <>
      <Header/>
        <InformacionComponente/>
      <Footer/>
    </>
  );
}

export default App;
