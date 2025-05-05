import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Bienvenida from "./Pages/Inicio";
import ClientesRegistrados from "./Pages/Clientes";
import CrearUsuario from "./Pages/CrearCliente";
import EditarUsuario from "./Pages/EditarCliente";
import ListaPrestamos from "./Pages/Prestamos";
import Pagos from "./Pages/Pagos";
import NavBar from "./Pages/NavBar";
import ListaPrestamosUsuario from "./Pages/PrestamosCliente";

function App() {
  const showNavBar = location.pathname !== "/";

  return (
    <>
      {showNavBar && <NavBar />}

      <Routes>
        <Route exact path="/" element={<Bienvenida />}></Route>

        <Route exact path="/clientes" element={<ClientesRegistrados />} />
        <Route exact path="/crearUsuario" element={<CrearUsuario />} />
        <Route exact path="/editarUsuario/:id" element={<EditarUsuario />} />
        <Route exact path="/prestamos" element={<ListaPrestamos />} />
        <Route
          exact
          path="/prestamos/:idCliente"
          element={<ListaPrestamosUsuario />}
        />
        <Route exact path="/pagos/:idPrestamo" element={<Pagos />} />
      </Routes>
    </>
  );
}

export default App;
