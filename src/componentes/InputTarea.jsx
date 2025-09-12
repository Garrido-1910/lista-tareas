import "../estilos/InputTarea.css";
import React, { useState, useEffect } from "react";
import { postData } from "../servios/Servicios.js";
import ComponenteModal from "./ComponenteModal.jsx";

function InputTarea({ onNuevaTarea }) {
  const [formData, setFormData] = useState({ titulo: "", descripcion: "" });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
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
      setMensaje({
        tipo: "error",
        texto: "Por favor ingrese título y descripción.",
      });
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
      setMensaje({
        tipo: "error",
        texto: "❌ Hubo un error al agregar la tarea.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="formTarea" className="input-container" onSubmit={agregarTarea}>
      <label id="labelTitulo" htmlFor="inputTitulo">
        Título de la tarea
      </label>
      <input
        id="inputTitulo"
        name="titulo"
        value={formData.titulo}
        onChange={handleChange}
        type="text"
        placeholder="Título de la tarea"
      />

      <label id="labelDescripcion" htmlFor="inputDescripcion">
        Descripción
      </label>
      <textarea
        id="inputDescripcion"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        placeholder="Descripción de la tarea"
        rows={3}
      />

      {mensaje.texto && (
        <p
          id={
            mensaje.tipo === "error"
              ? "mensajeErrorTarea"
              : "mensajeSuccessTarea"
          }
          className={mensaje.tipo === "error" ? "error-mensaje" : "success-mensaje"}
        >
          {mensaje.texto}
        </p>
      )}

      <button id="btnAgregarTarea" type="submit" disabled={loading} aria-busy={loading}>
        {loading ? "Agregando..." : "Agregar"}
      </button>


      
    </form>
  );
}

export default InputTarea;
