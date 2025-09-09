import ("../estilos/InputTarea.css"); 
import React, { useState } from "react";
import { postData } from "../servios/Servicios.js";

function InputTarea() {
  const [tituloTarea, setTituloTarea] = useState("");
  const [descripcionTarea, setDescripcionTarea] = useState("");

  async function agregarTarea() {
    const nuevaTarea = {
      titulo: tituloTarea.trim(),
      descripcion: descripcionTarea.trim(),
      estado: 'pendiente',
    };

    try {
      const respuesta = await postData("tareas", nuevaTarea);
      console.log("Tarea agregada:", respuesta);

      setTituloTarea("");
      setDescripcionTarea("");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  }

    return (
  <div className="input-container">
    <input
      value={tituloTarea}
      onChange={(e) => setTituloTarea(e.target.value)}
      type="text"
      placeholder="Titulo de la tarea"
    />
    <input
      value={descripcionTarea}
      onChange={(e) => setDescripcionTarea(e.target.value)}
      type="text"
      placeholder="Descripcion de la tarea"
    />
    <button onClick={agregarTarea}>Agregar</button>
  </div>
    );
}

export default InputTarea;
