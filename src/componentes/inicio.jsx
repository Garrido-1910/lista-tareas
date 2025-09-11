import React, { useState } from "react";
import "../estilos/FormularioLogin.css";
import { getData } from "../servios/Servicios"; // 👈 asegúrate de tener este servicio implementado

const FormularioLogin = ({ onLogin }) => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!usuario.trim() || !clave.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 📌 Obtenemos todos los usuarios desde la API
      const usuarios = await getData("usuarios");

      // 📌 Verificamos si hay coincidencia
      const usuarioValido = usuarios.find(
        (u) => u.usuario === usuario && u.clave === clave
      );

      if (usuarioValido) {
        console.log("✅ Login correcto:", usuarioValido);
        onLogin?.(usuarioValido); // opcional: pasar usuario al padre
        localStorage.setItem("usuario", JSON.stringify(usuarioValido)); // guardar sesión
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
    <form className="form-login" onSubmit={handleLogin}>
      <h2>Iniciar Sesión</h2>

      <label>
        Usuario
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Ingrese su usuario"
        />
      </label>

      <label>
        Contraseña
        <input
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          placeholder="Ingrese su contraseña"
        />
      </label>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};

export default FormularioLogin;
