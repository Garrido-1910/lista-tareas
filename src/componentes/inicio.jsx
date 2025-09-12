import React, { useState } from "react";
import "../estilos/Login.css";
import { getData } from "../servios/Servicios";
import { useNavigate } from "react-router-dom";

const Inicio = ({ onLogin }) => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (!usuario.trim() || !clave.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const usuarios = await getData("usuarios");
      const usuarioValido = usuarios.find(
        (u) => u.usuario === usuario && u.clave === clave
      );

      if (usuarioValido) {
        console.log("✅ Login correcto:", usuarioValido);
        onLogin?.(usuarioValido);
        localStorage.setItem("usuario", JSON.stringify(usuarioValido));
        navigate("/principal");
      } else {
        setError("❌ Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Hubo un error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="formLogin" className="form-login" onSubmit={handleLogin}>
      <h2 id="tituloLogin">Iniciar Sesión</h2>

      <label id="labelUsuario" htmlFor="inputUsuario">
        Usuario
      </label>
      <input
        id="inputUsuario"
        type="text"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        placeholder="Ingrese su usuario"
      />

      <label id="labelClave" htmlFor="inputClave">
        Contraseña
      </label>
      <input
        id="inputClave"
        type="password"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
        placeholder="Ingrese su contraseña"
      />

      {error && (
        <p id="mensajeErrorLogin" className="form-error">
          {error}
        </p>
      )}

      <button id="btnIngresar" type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};

export default Inicio;
