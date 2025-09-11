import "../estilos/InputTarea.css";
import React, { useState, useEffect } from "react";
import { postData } from "../servios/Servicios.js";

function InputTarea({ onNuevaTarea }) {
  const [formData, setFormData] = useState({ titulo: "", descripcion: "" });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  // 🔹 Limpia automáticamente mensajes temporales
  useEffect(() => {
    if (mensaje.texto) {
      const timer = setTimeout(() => setMensaje({ tipo: "", texto: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validarFormulario = () => {
    if (!formData.titulo.trim() || !formData.descripcion.trim()) {
      setMensaje({ tipo: "error", texto: "Por favor ingrese título y descripción." });
      return false;
    }
    return true;
  };

  const resetFormulario = () => {
    setFormData({ titulo: "", descripcion: "" });
  };

  async function agregarTarea(e) {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      setLoading(true);
      const nuevaTarea = {
        titulo: formData.titulo.trim(),
        descripcion: formData.descripcion.trim(),
        estado: "pendiente",
      };

      const respuesta = await postData("tareas", nuevaTarea);
      console.log("✅ Tarea agregada:", respuesta);

      resetFormulario();
      onNuevaTarea?.(respuesta);

      setMensaje({ tipo: "success", texto: "✅ Tarea agregada correctamente" });
    } catch (error) {
      console.error("❌ Error al agregar tarea:", error);
      setMensaje({ tipo: "error", texto: "❌ Hubo un error al agregar la tarea." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="input-container" onSubmit={agregarTarea}>
      <label htmlFor="titulo">Título de la tarea</label>
      <input
        id="titulo"
        name="titulo"
        value={formData.titulo}
        onChange={handleChange}
        type="text"
        placeholder="Título de la tarea"
      />

      <label htmlFor="descripcion">Descripción</label>
      <textarea
        id="descripcion"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        placeholder="Descripción de la tarea"
        rows={3}
      />

      {mensaje.texto && (
        <p className={mensaje.tipo === "error" ? "error-mensaje" : "success-mensaje"}>
          {mensaje.texto}
        </p>
      )}

      <button type="submit" disabled={loading} aria-busy={loading}>
        {loading ? "Agregando..." : "Agregar"}
      </button>
    </form>
  );
}

export default InputTarea;
