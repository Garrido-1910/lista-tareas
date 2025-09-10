import Tareas from "./Tareas";
import "../estilos/Lista.css";
import { deleteData, patchData } from "../servios/Servicios.js"; 

const Lista = ({ listaTareas, setListaTareas }) => {
  
  async function eliminar(id) {
    try {
      await deleteData("tareas", id);
      setListaTareas(listaTareas.filter((tarea) => tarea.id !== id));
      console.log("✅ Tarea eliminada con éxito");
    } catch (error) {
      console.error("❌ Error al eliminar tarea:", error);
    }
  }

  async function cambiarEstado(id, estadoActual) {
    const nuevoEstado = estadoActual === "pendiente" ? "completada" : "pendiente";

    try {
      await patchData("tareas", { estado: nuevoEstado }, id);
      const nuevasTareas = listaTareas.map((tarea) =>
        tarea.id === id ? { ...tarea, estado: nuevoEstado } : tarea
      );
      setListaTareas(nuevasTareas);

      console.log(`✅ Estado de la tarea ${id} cambiado a ${nuevoEstado}`);
    } catch (error) {
      console.error("❌ Error al cambiar estado:", error);
      alert("No se pudo cambiar el estado de la tarea.");
    }
  }

  return (
    <div className="lista-container">
      {listaTareas.length === 0 ? (
        <p className="lista-vacia">No hay tareas aún</p>
      ) : (
        listaTareas.map((tarea) => (
          <Tareas
            key={tarea.id}
            titulo={tarea.titulo}
            descripcion={tarea.descripcion}
            estado={tarea.estado}
            clickEliminar={() => eliminar(tarea.id)}
            clickEstado={() => cambiarEstado(tarea.id, tarea.estado)}
          />
        ))
      )}
    </div>
  );
};

export default Lista;
