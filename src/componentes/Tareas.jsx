import "../estilos/Tareas.css";

function FormatoTareas({id,titulo,descripcion,estado,clickEditar,clickEliminar,clickEstado}) {
  return (
    <>
      <div
        id={`tareaItem-${id}`}
        className={`tarea-item ${estado ? "pendiente" : "completada"}`}
      >
        <div id={`tareaContenido-${id}`} className="tarea-contenido">
          <h3 id={`tareaTitulo-${id}`} className="tarea-titulo">{titulo}</h3>
          <p id={`tareaDescripcion-${id}`} className="tarea-descripcion">{descripcion}</p>
        </div>

        <div id={`tareaAcciones-${id}`} className="tarea-acciones">
          <button
            id={`tareaBtnEstado-${id}`}
            className="tarea-estado"
            onClick={clickEstado}
            aria-label={estado ? "Marcar como completada" : "Marcar como pendiente"}
          >
            {estado ? "✅" : "↩️"}
          </button>

          <button
            id={`tareaBtnEditar-${id}`}
            className="tarea-editar"
            onClick={clickEditar}
            aria-label="Editar tarea"
          >
            ✏️
          </button>
          <button
            id={`tareaBtnEliminar-${id}`}
            className="tarea-eliminar"
            onClick={clickEliminar}
            aria-label="Eliminar tarea"
          >
            🗑
          </button>
        </div>
      </div>
    </>
  )

};
export default FormatoTareas;
