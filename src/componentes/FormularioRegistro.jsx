import React, { useState } from "react";
import "../estilos/FormularioRegistro.css";
import { postData } from "../servios/Servicios";

const FormularioRegistro = () => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [confirmClave, setConfirmClave] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      usuario:usuario,
      clave:clave
    }
    const peticion = await postData("usuarios",objUsuario)
    console.log(peticion);
    
    setError("");
    setLoading(true);


    // limpiar campos
    setUsuario("");
    setClave("");
    setConfirmClave("");
    setLoading(false);
  }

  return (
    <form  className="form-registro">
      <h2>Registro</h2>

      <label>
        Nombre de usuario
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

      <label>
        Confirmar contraseña
        <input
          type="password"
          value={confirmClave}
          onChange={(e) => setConfirmClave(e.target.value)}
          placeholder="Confirme su contraseña"
        />
      </label>

      {error && <p className="form-error">{error}</p>}

      <button type="button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};

export default FormularioRegistro;
