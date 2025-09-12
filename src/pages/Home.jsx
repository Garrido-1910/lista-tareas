import InputTarea from "../componentes/InputTarea";
import { useEffect, useState } from "react";
import { deleteData, getData, patchData } from "../servios/Servicios";
import FormularioRegistro from "../componentes/FormularioRegistro";
import FormatoTareas from "../componentes/Tareas";
import ComponenteModal from "../componentes/ComponenteModal";
import "../estilos/Home.css"
import { useNavigate } from "react-router-dom";
function Home() {
  const [tareas, setTareas] = useState([]);
  const [tareasCompletadas, setTareasCompletadas] = useState([]);
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()
  const cerrarModal = () => {
    setModal(false)
  }


  useEffect(() => {
    async function cargarTareas() {
      try {
        const datos = await getData("tareas");
        const filtroPendientes = datos.filter((tarea) => tarea.estado === "pendiente")
        const filtroCompletadas = datos.filter((tarea) => tarea.estado === "completada")
        setTareas(filtroPendientes);
        setTareasCompletadas(filtroCompletadas);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    }
    cargarTareas();
  }, [tareas]);

  async function deleteTarea(id) {
    await deleteData("tareas", id)
  }

  async function cambiarEstado(id, estado) {
    await patchData("tareas", { estado: estado == "pendiente" ? "completada" : "pendiente" }, id)
  }

  return (
    <div className="contenedor-todo"> 
     <div className="item">
      <InputTarea />

      <h1>Pendientes</h1>
      {tareas.map((tarea, index) => {
        return (
          <>
            <FormatoTareas
              key={index}
              titulo={tarea.titulo}
              descripcion={tarea.descripcion}
              clickEliminar={() => deleteTarea(tarea.id)}
              clickEstado={() => cambiarEstado(tarea.id, tarea.estado)}
            />

          </>
        )
      })}
      <h1>Completadas</h1>
      {tareasCompletadas.map((tarea, index) => {
        return (
          <>
            <FormatoTareas
              key={index}
              titulo={tarea.titulo}
              descripcion={tarea.descripcion}
              clickEliminar={() => deleteTarea(tarea.id)}
              clickEstado={() => cambiarEstado(tarea.id, tarea.estado)}
              clickEditar={() => {
                setModal(true)
                localStorage.setItem("idTarea", tarea.id)
              }}
            />

          </>
        )
      })}
      {<ComponenteModal
        mostrar={modal}
        ocultar={cerrarModal}
      />}
    </div>
    <div className="item">
       <div  onClick={()=>navigate("/perfil")} className="mov-perfil">
        <div className="bolita-perfil">

        </div>
      </div>
    </div>
    </div>
  );
}

export default Home;


