import Tareas from "./Tareas";
import "../estilos/Lista.css";
import { deleteData } from "../servios/Servicios.js";

const Lista = ({ listaTareas, setListaTareas }) => {
  async function eliminar(id) {
    try {
      await deleteData("tareas", id);
      const nuevasTareas = listaTareas.filter((tarea) => tarea.id !== id);
      setListaTareas(nuevasTareas);

      console.log("Tarea eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  }

  return (
    <div className="lista-container">
      {listaTareas.map((tarea) => (
        <Tareas
          key={tarea.id}
          titulo={tarea.titulo}
          descripcion={tarea.descripcion}
          estado={tarea.estado}
          clickEliminar={() => eliminar(tarea.id)}
        />
      ))}
    </div>
  );
};

export default Lista;
