import "../estilos/InputTarea.css";
import React, { useState } from "react";
import { postData } from "../servios/Servicios.js"; // corregí "servios"

function InputTarea({ onNuevaTarea }) {
  const [tituloTarea, setTituloTarea] = useState("");
  const [descripcionTarea, setDescripcionTarea] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(""); 
  const [error, setError] = useState("");

  async function agregarTarea(e) {
    e.preventDefault();

    if (!tituloTarea.trim() || !descripcionTarea.trim()) {
      setError("Por favor ingrese título y descripción.");
      return;
    }

    setError("");
    const nuevaTarea = {
      titulo: tituloTarea.trim(),
      descripcion: descripcionTarea.trim(),
      estado: "pendiente",
    };

    try {
      setLoading(true);
      const respuesta = await postData("tareas", nuevaTarea);
      console.log("Tarea agregada:", respuesta);

  
      setTituloTarea("");
      setDescripcionTarea("");

  
      if (onNuevaTarea) onNuevaTarea(respuesta);

      setMensaje("✅ Tarea agregada correctamente");
      setTimeout(() => setMensaje(""), 3000); 

    } catch (error) {
      console.error("Error al agregar tarea:", error);
      setError("❌ Hubo un error al agregar la tarea.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="input-container" onSubmit={agregarTarea}>
      <label>
        Título de la tarea
        <input
          value={tituloTarea}
          onChange={({ target }) => setTituloTarea(target.value)}
          type="text"
          placeholder="Título de la tarea"
        />
      </label>

      <label>
        Descripción
        <input
          value={descripcionTarea}
          onChange={({ target }) => setDescripcionTarea(target.value)}
          type="text"
          placeholder="Descripción de la tarea"
        />
      </label>

      {error && <p className="error-mensaje">{error}</p>}
      {mensaje && <p className="success-mensaje">{mensaje}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Agregando..." : "Agregar"}
      </button>
    </form>
  );
}

export default InputTarea;
