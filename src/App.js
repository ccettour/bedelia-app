import './App.css';
import {InformacionComponente} from './componentes/institucional/institucional';
import { Footer } from './componentes/Footer/Footer';
import {Header} from './componentes/Header/Header';

function App() {
  return (
    <div className="App">
      <Header/>
        <InformacionComponente/>
      <Footer/>
    </div>
  );
}

export default App;
