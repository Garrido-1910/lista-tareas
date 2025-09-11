import React from "react";
import Tareas from "./Tareas";
import "../estilos/Lista.css";
import { deleteData, patchData } from "../servios/Servicios.js";

const Lista = ({ listaTareas = [], setListaTareas }) => {
  const eliminar = async (id) => {
    try {
      await deleteData("tareas", id);
      setListaTareas((prev) => prev.filter((tarea) => tarea.id !== id));
      console.log("✅ Tarea eliminada con éxito");
    } catch (error) {
      console.error("❌ Error al eliminar tarea:", error);
    }
  };

  const cambiarEstado = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === "pendiente" ? "completada" : "pendiente";

    try {
      await patchData("tareas", { estado: nuevoEstado }, id);

      setListaTareas((prev) =>
        prev.map((tarea) =>
          tarea.id === id ? { ...tarea, estado: nuevoEstado } : tarea
        )
      );

      console.log(`✅ Estado de la tarea ${id} cambiado a ${nuevoEstado}`);
    } catch (error) {
      console.error("❌ Error al cambiar estado:", error);
    }
  };

  if (!listaTareas?.length) {
    return <p className="lista-vacia">No hay tareas aún</p>;
  }

  return (
    <div className="lista-container">
      {listaTareas.map(({ id, titulo, descripcion, estado }) => (
        <Tareas
          key={id}
          titulo={titulo}
          descripcion={descripcion}
          estado={estado}
          clickEliminar={() => eliminar(id)}
          clickEstado={() => cambiarEstado(id, estado)}
        />
      ))}
    </div>
  );
};

export default Lista;
