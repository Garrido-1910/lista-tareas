import React, { useState } from "react";
import "../estilos/FormularioRegistro.css";
import { postData } from "../servios/Servicios";
import {useNavigate} from "react-router-dom"
const FormularioRegistro = () => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [confirmClave, setConfirmClave] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault();

    if (!usuario.trim() || !clave.trim() || !confirmClave.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (clave.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (clave !== confirmClave) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const objUsuario = {
      usuario: usuario,
      clave: clave,
    };
    const peticion = await postData("usuarios", objUsuario);
    console.log(peticion);

    setError("");
    setLoading(true);
    setUsuario("");
    setClave("");
    setConfirmClave("");
    setLoading(false);
    navigate("/inicio")
  }

  return (
    <form id="formRegistro" className="form-registro" onSubmit={handleSubmit}>
      <h2 id="tituloRegistro">Registro</h2>

      <label htmlFor="inputUsuario">Nombre de usuario</label>
      <input
        id="inputUsuario"
        type="text"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        placeholder="Ingrese su usuario"
      />

      <label htmlFor="inputClave">Contraseña</label>
      <input
        id="inputClave"
        type="password"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
        placeholder="Ingrese su contraseña"
      />

      <label htmlFor="inputConfirmClave">Confirmar contraseña</label>
      <input
        id="inputConfirmClave"
        type="password"
        value={confirmClave}
        onChange={(e) => setConfirmClave(e.target.value)}
        placeholder="Confirme su contraseña"
      />

      {error && <p id="mensajeErrorRegistro" className="form-error">{error}</p>}

      <button
        id="btnRegistrarse"
        type="submit"
        disabled={loading}
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};

export default FormularioRegistro;
