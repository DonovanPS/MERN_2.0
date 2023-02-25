
//Import prime
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";

import './App.css';
import ListaUsuarios from './components/ListaUsuarios';
import AgregarUsuario from './components/Agregar/AgregarUsuario';
import Txt from './components/Txt';

function App() {
  return (
    <div className="App">

      <h1>CRUD USUARIOS CON MERN</h1>

    <br/>
   <Txt/>
    <br/>
    <br/>
    
      <AgregarUsuario />
      <ListaUsuarios />

    </div>
  );
}

export default App;
