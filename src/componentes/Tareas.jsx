import "../estilos/Tareas.css";

const Tareas = ({
  titulo = "Sin título",
  descripcion = "Sin descripción",
  estado = "pendiente",
  clickEliminar = () => {},
  clickEditar = () => {},
  clickEstado = () => {},
}) => {
  const esPendiente = estado === "pendiente";

  return (
    <div className={`tarea-item ${esPendiente ? "pendiente" : "completada"}`}>
      <div className="tarea-contenido">
        <h3 className="tarea-titulo">{titulo}</h3>
        <p className="tarea-descripcion">{descripcion}</p>
      </div>

      <div className="tarea-acciones">
        <button
          className="tarea-estado"
          onClick={clickEstado}
          aria-label={esPendiente ? "Marcar como completada" : "Marcar como pendiente"}
        >
          {esPendiente ? "✅" : "↩️"}
        </button>

        <button
          className="tarea-editar"
          onClick={clickEditar}
          aria-label="Editar tarea"
        >
          ✏️
        </button>

        <button
          className="tarea-eliminar"
          onClick={clickEliminar}
          aria-label="Eliminar tarea"
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default Tareas;
