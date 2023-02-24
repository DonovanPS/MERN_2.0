
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

function App() {
  return (
    <div className="App">

      <h1>CRUD USUARIOS CON MERN</h1>

    <br/>
    <iframe id="inlineFrameExample"
    title="Inline Frame Example"
    width="300"
    height="200"
    src="https://drive.google.com/file/d/1MsKI22E5KlYJQUGOMmEKSFAOmaN9s2gp/preview?usp=sharing">
</iframe>


    <br/>
    <br/>
      <AgregarUsuario />
      <ListaUsuarios />

    </div>
  );
}

export default App;
