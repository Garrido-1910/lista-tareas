import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registro from "../pages/Registro";
import Home from "../pages/Home";
import Inicio from "../pages/Inicio"; // 👈 nueva página de inicio

function Routing() {
  const isAuth = !!localStorage.getItem("usuario"); // verifica si hay usuario logueado

  return (
    <Router>
      <Routes>
        {/* Página de registro */}
        <Route path="/" element={<Registro />} />

        {/* Página de tareas */}
        <Route path="/tareas" element={isAuth ? <Home /> : <Navigate to="/" />} />

        {/* Página de inicio protegida */}
        <Route path="/inicio" element={isAuth ? <Inicio /> : <Navigate to="/" />} />

        {/* Redirigir rutas desconocidas a registro */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default Routing;
