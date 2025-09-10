import "../estilos/Tareas.css";

const Tareas = ({ titulo, descripcion, estado, clickEliminar, clickEditar, clickEstado }) => {
  const esPendiente = estado === "pendiente";

  return (
    <div className={`tarea-item ${esPendiente ? "pendiente" : "completada"}`}>
      <div className="tarea-contenido">
        <h3 className="tarea-titulo">{titulo}</h3>
        <p className="tarea-descripcion">{descripcion}</p>
      </div>

      <div className="tarea-acciones">
        <button className="tarea-estado" onClick={clickEstado}>
          {esPendiente ? "" : ""}
        </button>
        <button className="tarea-editar" onClick={clickEditar}>✏️ Editar</button>
        <button className="tarea-eliminar" onClick={clickEliminar}>🗑 Eliminar</button>
      </div>
    </div>
  );
};

export default Tareas;

