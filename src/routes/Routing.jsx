import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Registro from "../pages/Registro";
import Login from "../pages/Login";
import PagPerfil from "../pages/PagPerfil";

function Routing() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Registro/>}/>
          <Route path="/principal" element={<Home/>}/>
          <Route path="/inicio" element={<Login/>}/>
          <Route path="/perfil" element={<PagPerfil/>}/>
      </Routes> 
    </Router>
  );
}

export default Routing;
