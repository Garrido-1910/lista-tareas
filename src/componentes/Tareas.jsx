  import "../estilos/Tareas.css"
const Tareas = ({titulo,descripcion,estado,clickEliminar,clickEditar}) => {
  return (
    <div className="tarea-item">
      <h3 className="tarea-titulo">{titulo}</h3>
      <p className="tarea-descripcion">{descripcion}</p>
      <button className="tarea-eliminar" onClick={clickEliminar}>Eliminar</button>
      <button className="tarea-editar" onClick={clickEditar}>Editar</button>
      <p className="tarea-estado">{estado}</p>
    </div>
  )
}

export default Tareas;
